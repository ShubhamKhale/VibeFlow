package controllers

import (
	"net/http"
	"vibeflow-go-gin-application/helpers"
	"vibeflow-go-gin-application/services"
	"vibeflow-go-gin-application/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func FetchTrendingPlaylists(c *gin.Context) {

	mongodocs, mongodocserr := helpers.MongoGetMultipleDocuments("trending_songs", bson.D{}, 0, 0)
	if mongodocserr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "failed to fetch trending playlists from mongo: " + mongodocserr.Error(),
			"mongodocs":  "",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "successfully fetched trending songs playlist",
		"mongodocs":  mongodocs,
	})
}

func FetchTopAlbumns(c *gin.Context) {

	mongodocs, mongodocserr := helpers.MongoGetMultipleDocuments("top_albumns", bson.D{}, 0, 0)
	if mongodocserr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "failed to fetch top albumns from mongo: " + mongodocserr.Error(),
			"mongodocs":  "",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "successfully fetched top albumns",
		"mongodocs":  mongodocs,
	})

}

func FetchTopGenres(c *gin.Context) {

	mongodocs, mongodocserr := helpers.MongoGetMultipleDocuments("top_genres", bson.D{}, 0, 0)
	if mongodocserr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "failed to fetch top genres from mongo: " + mongodocserr.Error(),
			"mongodocs":  "",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "successfully fetched top genres",
		"mongodocs":  mongodocs,
	})

}

func FetchNewReleaseSongs(c *gin.Context) {

	mongodocs, mongodocserr := helpers.MongoGetMultipleDocuments("new_release_songs", bson.D{}, 0, 0)
	if mongodocserr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "failed to fetch new release songs from mongo: " + mongodocserr.Error(),
			"mongodocs":  "",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "successfully fetched new release songs",
		"mongodocs":  mongodocs,
	})

}

func FetchTrendingPlaylist(c *gin.Context) {

	playlistid := c.Param("id")

	playlistobjectid, playlistobjectediderr := primitive.ObjectIDFromHex(playlistid)
	if playlistobjectediderr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"statuscode": http.StatusBadRequest,
			"message":    "invalid Object ID: " + playlistobjectediderr.Error(),
		})
		return
	}

	mongodoc, mongodocerr := helpers.MongoGetOneDocument("trending_songs", bson.M{"_id": playlistobjectid})
	if mongodocerr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "failed to fetch trending playlist from mongo: " + mongodocerr.Error(),
			"mongodoc":   "",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "successfully fetched trending  playlist",
		"mongodoc":   mongodoc,
	})
}
