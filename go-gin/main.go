package main

import (
	"time"
	"vibeflow-go-gin-application/helpers"
	"vibeflow-go-gin-application/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Gin
	r := gin.Default()

	// connect to mongodb
	helpers.InitMongoClient()

	// Configure CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8100"},        // Allow only the frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"}, // Specify allowed methods
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour, // Cache the preflight request for a specified duration
	}))

	// Set up routes
	routes.SetupRoutes(r)

	// Run the server
	r.Run(":8080") // Default port is 8080
}
