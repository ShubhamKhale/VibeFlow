package controllers

import (
	"fmt"
	"net/http"
	"strings"
	"time"
	"vibeflow-go-gin-application/helpers"
	"vibeflow-go-gin-application/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CreateUser function creates a new user in MongoDB
func CreateUser(c *gin.Context) {
	var user models.User
	if blindjsonerr := c.ShouldBindJSON(&user); blindjsonerr != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input: " + blindjsonerr.Error(), "userID": ""})
		return
	}
	if user.Username == "" || user.Password == "" || user.Email == "" || user.Mobile == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "All fields are required", "userID": ""})
		return
	}
	filter := bson.M{"mobile": user.Mobile}
	usrexists, usrexistserr := helpers.MongoDocumentExist("app_users", filter)
	if usrexistserr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Database error: " + usrexistserr.Error(), "userID": ""})
		return
	}
	if usrexists {
		c.JSON(http.StatusConflict, gin.H{"statuscode": http.StatusConflict, "message": "User with this mobile number already exists", "userID": ""})
		return
	}
	newUser := bson.D{
		{Key: "username", Value: strings.TrimSpace(user.Username)},
		{Key: "password", Value: strings.TrimSpace(user.Password)},
		{Key: "email", Value: strings.TrimSpace(user.Email)},
		{Key: "mobile", Value: strings.TrimSpace(user.Mobile)},
		{Key: "recently_played_songs", Value: []string{}},
		{Key: "playlists", Value: []string{}},
		{Key: "favourite_songs", Value: []string{}},
		{Key: "saved_songs", Value: []string{}},
		{Key: "createdAt", Value: primitive.NewDateTimeFromTime(time.Now())},
	}
	mongoinst, mongoinsterr := helpers.MongoAddOneDocument("app_users", newUser)
	if mongoinsterr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to create user: " + mongoinsterr.Error(), "userID": ""})
		return
	}
	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "User created successfully", "userID": mongoinst.InsertedID})
}

// LoginUser function logs an existing user into the app
func LoginUser(c *gin.Context) {
	var user models.UserLogin
	// Bind JSON input to the user struct
	if bindjsonerr := c.ShouldBindJSON(&user); bindjsonerr != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"statuscode": http.StatusBadRequest,
			"message":    "Invalid input: " + bindjsonerr.Error(),
			"mongodoc":   "",
		})
		return
	}
	// Validate that required fields are present
	if user.Username == "" || user.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"statuscode": http.StatusBadRequest,
			"message":    "All fields are required",
			"mongodoc":   "",
		})
		return
	}
	// Create a user payload as a map (correct syntax)
	userpayload := map[string]string{
		"username": strings.TrimSpace(user.Username),
		"password": strings.TrimSpace(user.Password),
	}
	// Fetch user document from MongoDB
	mongodoc, mongodocerr := helpers.MongoGetOneDocument("app_users", userpayload)
	if mongodocerr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "Failed to login user: " + mongodocerr.Error(),
			"mongodoc":   "",
		})
		return
	}
	// Respond with the user document if found
	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "User logged in successfully",
		"mongodoc":   mongodoc,
	})
}

// GetUserByID function retrieves a user's document from MongoDB using their MongoDB ID
func GetUserByID(c *gin.Context) {
	// Extract the MongoDB ID from the URL parameter
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"statuscode": http.StatusBadRequest,
			"message":    "User ID is required",
		})
		return
	}

	// Validate and convert the ID to MongoDB's ObjectID type
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"statuscode": http.StatusBadRequest,
			"message":    "Invalid User ID format",
		})
		return
	}

	// Create a filter to search by ID
	filter := bson.M{"_id": objectID}

	// Fetch the user's document from MongoDB
	userDocument, err := helpers.MongoGetOneDocument("app_users", filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"statuscode": http.StatusInternalServerError,
			"message":    "Error fetching user: " + err.Error(),
		})
		return
	}

	// If no user document is found, return a not found error
	if userDocument == nil {
		c.JSON(http.StatusNotFound, gin.H{
			"statuscode": http.StatusNotFound,
			"message":    "User not found",
		})
		return
	}

	// Respond with the user document
	c.JSON(http.StatusOK, gin.H{
		"statuscode": http.StatusOK,
		"message":    "User retrieved successfully",
		"mongodoc":   userDocument,
	})
}

// AddSongToFavourites adds a song to a user's favourites while ensuring unique song IDs
func AddSongToFavourites(c *gin.Context) {
	var request struct {
		UserID string               `json:"user_id"`
		Song   models.FavouriteSong `json:"song"`
	}

	if err := c.ShouldBindJSON(&request); err != nil || request.UserID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(request.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid User ID format"})
		return
	}

	opts := options.Update().SetUpsert(true)

	// Check if song_id already exists in user's favourite_songs
	userFilter := bson.M{"_id": objectID, "favourite_songs": request.Song.SongID}
	if existingSong, _ := helpers.MongoGetOneDocument("app_users", userFilter); existingSong == nil {
		fmt.Println("existingSong ", existingSong)
		// Add only the song_id to favourite_songs array in app_users collection
		userUpdate := bson.M{"$addToSet": bson.M{"favourite_songs": request.Song.SongID}}
		if _, err := helpers.MongoUpdateOneDocument("app_users", bson.M{"_id": objectID}, userUpdate, opts); err != nil {
			fmt.Println("app_users err", err)
			c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to update user"})
			return
		}
	}

	// Store entire song details in favourite_songs collection and increment count if exists
	songFilter := bson.M{"song_id": request.Song.SongID}

	update := bson.M{
		"$inc": bson.M{"song_count": 1}, // Increment count
		"$set": bson.M{ // Set only song details, excluding count
			"album_id":            request.Song.AlbumID,
			"album_url":           request.Song.AlbumURL,
			"encrypted_media_url": request.Song.EncryptedMediaURL,
			"has_lyrics":          request.Song.HasLyrics,
			"lyrics":              request.Song.Lyrics,
			"primary_artists":     request.Song.PrimaryArtists,
			"primary_artists_id":  request.Song.PrimaryArtistsID,
			"song_audio_preview":  request.Song.SongAudioPreview,
			"song_audio_url":      request.Song.SongAudioURL,
			"song_id":             request.Song.SongID,
			"song_image_url":      request.Song.SongImageURL,
			"song_name":           request.Song.SongName,
			"vcode":               request.Song.Vcode,
		},
	}

	if _, err := helpers.MongoUpdateOneDocument("favourite_songs", songFilter, update, opts); err != nil {
		fmt.Println("favourite_songs err", err)
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to update favourite_songs collection"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "Song added to favourites successfully"})
}

func RemoveSongFromFavourites(c *gin.Context) {
	var request struct {
		UserID string               `json:"user_id"`
		Song   models.FavouriteSong `json:"song"`
	}

	if err := c.ShouldBindJSON(&request); err != nil || request.UserID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(request.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid User ID format"})
		return
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$pull": bson.M{"favourite_songs": bson.M{"song_id": request.Song.SongID}}}
	opts := options.Update().SetUpsert(true)

	if _, err := helpers.MongoUpdateOneDocument("app_users", filter, update, opts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to update user"})
		return
	}

	songFilter := bson.M{"song_id": request.Song.SongID}
	songUpdate := bson.M{
		"$inc": bson.M{
			"song_count": bson.M{
				"$cond": bson.A{
					bson.M{"$gt": bson.M{"song_count": 0}}, // Condition: song_count > 0
					-1,                                     // If true, decrement by 1
					0,                                      // If false, keep it unchanged
				},
			},
		},
	}

	if _, err := helpers.MongoUpdateOneDocument("favourite_songs", songFilter, songUpdate, opts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to update favourite_songs collection"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "Song removed from favourites successfully"})
}

func GetFavouriteSongs(c *gin.Context) {
	var request struct {
		SongIDs []string `json:"song_ids"`
	}

	if err := c.ShouldBindJSON(&request); err != nil || len(request.SongIDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	filter := bson.M{"song_id": bson.M{"$in": request.SongIDs}}

	songs, err := helpers.MongoGetMultipleDocuments("favourite_songs", filter, 0, 0)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to fetch songs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "songs": songs})
}

func CreatePlaylist(c *gin.Context) {
	var request struct {
		UserID       string `json:"user_id"`
		PlaylistName string `json:"playlist_name"`
	}

	if err := c.ShouldBindJSON(&request); err != nil || request.UserID == "" || request.PlaylistName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(request.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid User ID format"})
		return
	}

	// Create the playlist object
	playlist := bson.M{
		"playlistname":  request.PlaylistName,
		"playlistimg":   "https://img.icons8.com/?size=512&id=EHtxO8ZmA602&format=png",
		"playlistsongs": []models.FavouriteSong{},
	}

	// Add the playlist object to the "playlists" array
	filter := bson.M{"_id": objectID}
	update := bson.M{"$push": bson.M{"playlists": playlist}}
	opts := options.Update().SetUpsert(true)

	if _, err := helpers.MongoUpdateOneDocument("app_users", filter, update, opts); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to add playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "Playlist added successfully"})
}

func FetchUsersPlaylists(c *gin.Context) {
	var request struct {
		UserID string `json:"user_id"`
	}

	if err := c.ShouldBindJSON(&request); err != nil || request.UserID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(request.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid User ID format"})
		return
	}

	filter := bson.M{"_id": objectID}
	projection := bson.M{"playlists": 1, "_id": 0}

	doc, err := helpers.MongoFindOneDocument("app_users", filter, projection)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to fetch playlists"})
		return
	}

	if doc == nil {
		c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "No playlists found", "playlists": []interface{}{}})
		return
	}

	var result struct {
		Playlists []struct {
			PlaylistName  string                 `bson:"playlistname"`
			PlaylistImg   string                 `bson:"playlistimg"`
			PlaylistSongs []models.FavouriteSong `bson:"playlistsongs"`
		} `bson:"playlists"`
	}
	bsonBytes, _ := bson.Marshal(doc)
	bson.Unmarshal(bsonBytes, &result)

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "Playlists fetched successfully", "playlists": result.Playlists})
}

// AddSongToPlaylist adds a song ID to a specific playlist in the app_users collection
func AddSongToPlaylist(c *gin.Context) {
	var request struct {
		UserID       string               `json:"user_id"`
		PlaylistName string               `json:"playlist_name"`
		Song         models.FavouriteSong `json:"song"`
	}

	var playlistsongids []string
	var playlistsongsimageurls []string
	var playlistimageurl string

	// Validate input
	if err := c.ShouldBindJSON(&request); err != nil || request.UserID == "" || request.PlaylistName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(request.UserID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid User ID format"})
		return
	}

	songFilter := bson.M{"song_id": request.Song.SongID}
	existingSong, _ := helpers.MongoGetOneDocument("playlist_songs", songFilter)

	if existingSong != nil {
		_, err = helpers.MongoUpdateOneDocument("playlist_songs", songFilter, bson.M{
			"$inc": bson.M{"count": 1},
		}, nil)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to update song count"})
			return
		}
	} else {

		newSong := bson.M{
			"song_id":             request.Song.SongID,
			"album_id":            request.Song.AlbumID,
			"album_url":           request.Song.AlbumURL,
			"encrypted_media_url": request.Song.EncryptedMediaURL,
			"has_lyrics":          request.Song.HasLyrics,
			"lyrics":              request.Song.Lyrics,
			"primary_artists":     request.Song.PrimaryArtists,
			"primary_artists_id":  request.Song.PrimaryArtistsID,
			"song_audio_preview":  request.Song.SongAudioPreview,
			"song_audio_url":      request.Song.SongAudioURL,
			"song_image_url":      request.Song.SongImageURL,
			"song_name":           request.Song.SongName,
			"vcode":               request.Song.Vcode,
			"song_count":          1,
			"added_at":            time.Now(),
		}

		if _, err = helpers.MongoAddOneDocument("playlist_songs", newSong); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to add song to playlist_songs"})
			return
		}
	}

	appUserFilter := bson.M{
		"_id":                    objectID,
		"playlists.playlistname": request.PlaylistName,
	}

	appUser, appUserErr := helpers.MongoGetOneDocument("app_users", appUserFilter)
	if appUserErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to get app user record"})
	}

	for _, playlist := range appUser["playlists"].(primitive.A) {
		playlistMap := playlist.(primitive.M)

		playlistName := playlistMap["playlistname"].(string)

		if playlistName != request.PlaylistName {
			continue
		}

		playlistSongs, ok := playlistMap["playlistsongs"].(primitive.A)
		if !ok {
			fmt.Println("Error: playlistsongs field not found or not an array")
			continue
		}

		for _, song := range playlistSongs {
			songMap := song.(primitive.M)
			songID := songMap["song_id"].(string)
			playlistsongids = append(playlistsongids, songID)
		}
	}

	playlistsongsfilter := bson.M{"song_id": bson.M{"$in": playlistsongids}}

	playlistsongs, _ := helpers.MongoGetMultipleDocuments("playlist_songs", playlistsongsfilter, 4, 0)

	for _, song := range playlistsongs {

		playlistsongsimageurls = append(playlistsongsimageurls, song["song_image_url"].(string))

		if len(playlistsongsimageurls) == 4 {
			break
		}
	}

	playlistsongsimageurls = append(playlistsongsimageurls, request.Song.SongImageURL)

	for len(playlistsongsimageurls) < 4 {
		playlistsongsimageurls = append(playlistsongsimageurls, "https://img.icons8.com/?size=512&id=EHtxO8ZmA602&format=png")
	}

	collageBuffer, collageBuffererr := CreateCollage(playlistsongsimageurls)
	if collageBuffererr != nil {
		fmt.Printf("Error creating collage: %v\n", collageBuffererr)
		return
	}

	playlistImageUrl, playlistImageUrlerr := UploadToCloudinary(collageBuffer)
	if playlistImageUrlerr != nil {
		fmt.Printf("Error uploading to Cloudinary: %v\n", playlistImageUrlerr)
		return
	}

	playlistimageurl = playlistImageUrl

	userFilter := bson.M{
		"_id": objectID,
		"playlists": bson.M{
			"$elemMatch": bson.M{
				"playlistname":          request.PlaylistName,
				"playlistsongs.song_id": request.Song.SongID,
			},
		},
	}

	recordExist, recordErr := helpers.MongoDocumentExist("app_users", userFilter)

	if recordErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Internal Server Error"})
		return
	}

	if recordExist {
		c.JSON(http.StatusConflict, gin.H{"statuscode": http.StatusConflict, "message": "Song already exists in the playlist"})
		return
	}

	update := bson.M{
		"$set": bson.M{
			"playlists.$[playlist].playlistimg": playlistimageurl,
		},
		"$push": bson.M{
			"playlists.$[playlist].playlistsongs": bson.M{
				"song_id": request.Song.SongID,
			},
		},
	}

	opts := options.Update().SetArrayFilters(options.ArrayFilters{
		Filters: []interface{}{bson.M{"playlist.playlistname": request.PlaylistName}},
	}).SetUpsert(true)

	if _, err := helpers.MongoUpdateOneDocument("app_users", bson.M{"_id": objectID}, update, opts); err != nil {
		fmt.Println("err :- ", err)
		c.JSON(http.StatusInternalServerError, gin.H{"statuscode": http.StatusInternalServerError, "message": "Failed to add song to user playlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "Song added to playlist successfully"})
}

func GetUserPlaylist(c *gin.Context) {
	userID := c.Query("user_id")
	playlistName := c.Query("playlist_name")

	if userID == "" || playlistName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid input"})
		return
	}

	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Invalid User ID format"})
		return
	}

	pipeline := mongo.Pipeline{
		{{Key: "$match", Value: bson.M{"_id": objectID}}},
		{{Key: "$unwind", Value: "$playlists"}},
		{{Key: "$match", Value: bson.M{"playlists.playlistname": playlistName}}},
		{{Key: "$project", Value: bson.M{"_id": 0, "playlists.playlistsongs.song_id": 1}}},
	}

	playlistResults, err := helpers.MongoAggregate("app_users", pipeline)
	if err != nil || len(playlistResults) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Internal Server Error"})
		return
	}

	songIDs := []string{}
	for _, song := range playlistResults[0]["playlists"].(bson.M)["playlistsongs"].(bson.A) {
		songIDs = append(songIDs, song.(bson.M)["song_id"].(string))
	}

	if len(songIDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Internal Server Error"})
		return
	}

	// Query songs from "playlist_songs" collection
	songPipeline := mongo.Pipeline{
		{{Key: "$match", Value: bson.M{"song_id": bson.M{"$in": songIDs}}}}, // Match song IDs
		{{Key: "$project", Value: bson.M{
			"_id":                 0,
			"song_image_url":      1,
			"vcode":               1,
			"album_id":            1,
			"encrypted_media_url": 1,
			"song_audio_preview":  1,
			"primary_artists":     1,
			"album_url":           1,
			"has_lyrics":          1,
			"lyrics":              1,
			"song_name":           1,
			"added_at":            1,
			"song_id":             1,
			"primary_artists_id":  1,
			"song_audio_url":      1,
			"count":               1,
		}}},
	}

	songResults, err := helpers.MongoAggregate("playlist_songs", songPipeline)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"statuscode": http.StatusBadRequest, "message": "Internal Server Error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"statuscode": http.StatusOK, "message": "Playlists fetched successfully", "playlistsongs": songResults})
}
