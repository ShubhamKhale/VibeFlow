package routes

import (
	"vibeflow-go-gin-application/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUser)
	r.POST("/users", controllers.CreateUser)
	r.GET("/songs/search", controllers.SearchSongs)
	r.POST("/songs/scrape-mp3", controllers.ScrapeSongMp3)
	r.POST("/songs/lyrics", controllers.ScrpaeSongLyrics)
}
