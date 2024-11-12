package controllers

import (
	"net/http"
	"vibeflow-go-gin-application/services"
	"vibeflow-go-gin-application/utils"

	"github.com/gin-gonic/gin"
)

// Define the request structure
type SongScrapeRequest struct {
	SongUrl string `json:"songUrl" binding:"required"`
}

type SongLyricsRequest struct {
	SongUrl string `json:"songUrl" binding:"required"`
}

// SearchSongs handles requests to search for songs.
func SearchSongs(c *gin.Context) {
	query := c.Query("query")
	if query == "" {
		utils.RespondError(c, http.StatusBadRequest, "Query parameter is required")
		return
	}

	songs, err := services.ScrapeSongs(query)
	if err != nil {
		utils.RespondError(c, http.StatusInternalServerError, "Failed to search songs")
		return
	}

	utils.RespondJSON(c, http.StatusOK, songs)

}

// ScrapeSongMp3 handles requests to scrape an MP3 URL from a given song page URL
func ScrapeSongMp3(c *gin.Context) {
	var request SongScrapeRequest

	// Bind JSON data from the request body to the request struct
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.RespondError(c, http.StatusBadRequest, "Invalid request payload")
		return
	}

	// Call the SongMp3Scraper function with the provided URL
	mp3Url := services.SongMp3Scraper(request.SongUrl)
	if mp3Url == "" {
		utils.RespondError(c, http.StatusInternalServerError, "Failed to retrieve MP3 URL")
		return
	}

	// Send the MP3 URL as a response
	utils.RespondJSON(c, http.StatusOK, gin.H{"mp3Url": mp3Url})
}

func ScrpaeSongLyrics(c *gin.Context) {
	var request SongLyricsRequest

	// Bind JSON data from the request body to the request struct
	if err := c.ShouldBindJSON(&request); err != nil {
		utils.RespondError(c, http.StatusBadRequest, "Invalid request payload")
		return
	}

	songlyrics, songlyricserr := services.ScrapeLyrics(request.SongUrl)
	if songlyricserr {
		utils.RespondError(c, http.StatusInternalServerError, "Failed to retrieve Song Lyrics")
		return
	}

	utils.RespondJSON(c, http.StatusOK, gin.H{"songLyrics": songlyrics})
}
