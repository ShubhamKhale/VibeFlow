package routes

import (
	"vibeflow-go-gin-application/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/songs/search", controllers.SearchSongs)
	r.GET("/get/trending-playlists", controllers.FetchTrendingPlaylists)
	r.GET("/get/trending-playlist/:id", controllers.FetchTrendingPlaylist)
	r.GET("/get/new-release-songs", controllers.FetchNewReleaseSongs)
	r.GET("/get/top-genres", controllers.FetchTopGenres)
	r.GET("/get/userbyid/:id", controllers.GetUserByID)
	r.GET("/get/topalbumns", controllers.FetchTopAlbumns)
	r.GET("/get/jiosaavn/songs", controllers.SearchJioSaavnSongs)
	r.POST("/get/playlists", controllers.FetchUsersPlaylists)
	r.POST("/get/favourite-songs", controllers.GetFavouriteSongs)
	r.POST("/create-user", controllers.CreateUser)
	r.POST("/login-user", controllers.LoginUser)
	r.POST("/create-playlist", controllers.CreatePlaylist)
	r.POST("/songs/scrape-mp3", controllers.ScrapeSongMp3)
	r.POST("/songs/lyrics", controllers.ScrpaeSongLyrics)
	r.PATCH("/songs/add-song-to-favourites", controllers.AddSongToFavourites)
	r.PATCH("/songs/remove-song-to-favourites", controllers.RemoveSongFromFavourites)
	r.PATCH("/songs/add-song-to-playlist", controllers.AddSongToPlaylist)
}
