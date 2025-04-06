package controllers

import (
	"crypto/des"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"vibeflow-go-gin-application/utils"

	"github.com/gin-gonic/gin"
	"github.com/tidwall/gjson"
)

func SearchJioSaavnSongs(c *gin.Context) {
	query := c.Query("query")
	if query == "" {
		utils.RespondError(c, http.StatusBadRequest, "Query parameter is required")
		return
	}

	songs := SearchForSongs(query)
	// if err != nil {
	// 	utils.RespondError(c, http.StatusInternalServerError, "Failed to search songs")
	// 	return
	// }

	utils.RespondJSON(c, http.StatusOK, songs)

}

func GenerateSongSuggestions(query string) interface{} {

	formattedQuery := strings.ReplaceAll(strings.ToLower(query), " ", "%2520")

	searchURL := fmt.Sprintf("https://www.jiosaavn.com/api.php?__call=search.getResults&q=%s&ctx=wap6dot0&api_version=4&_format=json&_marker=0", formattedQuery)

	client := &http.Client{}
	req, err := http.NewRequest("GET", searchURL, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
	req.Header.Set("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making request:", err)
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	bodyString := string(body)

	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: Non-200 status code:", resp.StatusCode)
		fmt.Println("Response body:", bodyString)
	}

	songsData := gjson.Get(bodyString, "results")

	var songs []map[string]interface{}
	for _, song := range songsData.Array() {
		id := song.Get("id").String()
		songData := GetSong(id)
		if songData != nil {
			songs = append(songs, songData)
		}
	}

	return songs

}

func SongSuggestions(c *gin.Context) {

	query := c.Query("query")
	if query == "" {
		utils.RespondError(c, http.StatusBadRequest, "Query parameter is required")
		return
	}

	songs := GenerateSongSuggestions(query)

	utils.RespondJSON(c, http.StatusOK, songs)
}

func SearchForSongs(query string) interface{} {

	formattedQuery := strings.ReplaceAll(strings.ToLower(query), " ", "%2520")

	searchURL := "https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=" + formattedQuery

	// Create an HTTP client
	client := &http.Client{}
	req, err := http.NewRequest("GET", searchURL, nil)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return nil
	}

	// Add headers
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")
	req.Header.Set("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error making request:", err)
		return nil
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	bodyString := string(body)

	// Check response status
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: Non-200 status code:", resp.StatusCode)
		fmt.Println("Response body:", bodyString)
		return nil
	}

	// Parse and process JSON
	songsData := gjson.Get(bodyString, "songs.data")

	// Format the songs
	var songs []map[string]interface{}
	for _, song := range songsData.Array() {
		id := song.Get("id").String()
		songData := GetSong(id)
		if songData != nil {
			songs = append(songs, songData)
		}
	}
	return songs
}

// GetSong gets song details by ID
func GetSong(id string) map[string]interface{} {
	songURL := "https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=" + id
	resp, err := http.Get(songURL)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	var songData map[string]interface{}
	if err := json.Unmarshal(body, &songData); err != nil {
		return nil
	}

	return FormatSong(songData, id)
}

func FormatSong(data map[string]interface{}, songid string) map[string]interface{} {

	var resultsongdata map[string]interface{} = make(map[string]interface{})

	if songData, ok := data[songid].(map[string]interface{}); ok {
		if encryptedMediaURL, ok := songData["encrypted_media_url"].(string); ok {

			mediaurl, mediaurlerr := decryptURL(encryptedMediaURL)
			if mediaurlerr != nil {
				fmt.Println("error occurred while getting the media url")
				return data
			}
			resultsongdata["song_id"] = songid
			resultsongdata["album_url"] = songData["album_url"]
			resultsongdata["album_id"] = songData["albumid"]
			resultsongdata["encrypted_media_url"] = songData["encrypted_media_url"]
			resultsongdata["has_lyrics"] = songData["has_lyrics"]
			resultsongdata["song_image_url"] = songData["image"]
			resultsongdata["primary_artists"] = songData["primary_artists"]
			resultsongdata["primary_artists_id"] = songData["primary_artists_id"]
			resultsongdata["song_name"] = strings.ReplaceAll(songData["song"].(string), "&quot;", "'")
			resultsongdata["vcode"] = songData["vcode"]
			resultsongdata["song_audio_preview"] = songData["vlink"]
			resultsongdata["song_audio_url"] = mediaurl

			if songData["has_lyrics"] == "true" {
				lyrics, lyricserr := GetLyrics(songid)

				if lyricserr != nil {
					fmt.Println("lyricserr", lyricserr)
				}

				resultsongdata["lyrics"] = lyrics

			} else {
				resultsongdata["lyrics"] = ""
			}

		} else {
			fmt.Println("encrypted_media_url not found or is not a string")
		}
	} else {
		fmt.Printf("%s not found or is not a map", songid)
	}

	// Handle lyrics if needed
	// if lyrics {
	// 	// Assume getLyrics is implemented in jiosaavn.go
	// 	data["lyrics"] = getLyrics(data["id"].(string))
	// }

	return resultsongdata
}

func decryptURL(url string) (string, error) {
	// DES key (must be 8 bytes)
	key := []byte("38346591")
	block, err := des.NewCipher(key)
	if err != nil {
		return "", fmt.Errorf("failed to create DES cipher: %v", err)
	}

	// Decode the base64 URL
	encURL, err := base64.StdEncoding.DecodeString(url)
	if err != nil {
		return "", fmt.Errorf("failed to base64 decode URL: %v", err)
	}

	// Apply PKCS5 padding if necessary
	padLen := des.BlockSize - (len(encURL) % des.BlockSize)
	if padLen != des.BlockSize {
		padding := make([]byte, padLen)
		encURL = append(encURL, padding...)
	}

	// Decrypt using ECB mode
	decURL := make([]byte, len(encURL))
	for i := 0; i < len(encURL); i += des.BlockSize {
		block.Decrypt(decURL[i:i+des.BlockSize], encURL[i:i+des.BlockSize])
	}

	// Convert the decrypted bytes into a string
	decURLStr := string(decURL)

	// Remove PKCS5 padding
	decURLStr = strings.TrimRight(decURLStr, "\x00\x01\x02\x03\x04\x05\x06\x07\x08")

	// Replace parts of the decrypted URL for the correct media URL format
	decURLStr = strings.Replace(decURLStr, "_96.mp4", "_320.mp4", -1)

	// Sanitize the URL
	decURLStr = sanitizeURL(decURLStr)

	return decURLStr, nil
}

// sanitizeURL ensures the URL starts with "https" and ends with ".mp4"
func sanitizeURL(url string) string {
	url = strings.TrimSpace(url) // Remove leading/trailing spaces or unexpected characters

	// Ensure the URL starts with "https"
	if !strings.HasPrefix(url, "https://") {
		return ""
	}

	// Ensure the URL ends with ".mp4"
	if !strings.HasSuffix(url, ".mp4") {
		return ""
	}

	return url
}

func Format(str string) string {
	// Format string as per the given function
	return strings.ReplaceAll(str, "&quot;", "'")
}

func GetLyrics(songID string) (string, error) {

	url := fmt.Sprintf("%s%s", "https://www.jiosaavn.com/api.php?__call=lyrics.getLyrics&ctx=web6dot0&api_version=4&_format=json&_marker=0%3F_marker%3D0&lyrics_id=", songID)

	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("err", err)
		return "", err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	var lyricsdata map[string]interface{}
	if err := json.Unmarshal(body, &lyricsdata); err != nil {
		fmt.Println("err", err)
		return "", err
	}

	return lyricsdata["lyrics"].(string), nil

}
