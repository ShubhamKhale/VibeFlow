package controllers

import (
	"net/http"
	"strings"
	"time"
	"vibeflow-go-gin-application/helpers"
	"vibeflow-go-gin-application/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	usrexists, _, usrexistserr := helpers.MongoDocumentExist("app_users", filter)
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
