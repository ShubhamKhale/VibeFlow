package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Song struct {
	Title string
	URL   string
}

type SongDetails struct {
	SongTitle string
	SongUrl   string
	// AudioSource string
	ImageURL string
	Artists  string
	// ReleaseYear string
}

type Playlist struct {
	MongoId        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	PlaylistName   string             `bson:"playlistname" json:"playlistname"`
	PlaylistURL    string             `bson:"playlisturl" json:"playlisturl"`
	PlaylistImage  string             `bson:"playlistimage" json:"playlistimage"`
	PlaylistArtist string             `bson:"playlistartist" json:"playlistartist"`
	PlaylistSongs  []PlaylistSongs    `bson:"playlistsongs" json:"playlistsongs"`
}

type PlaylistSongs struct {
	SongName   string `bson:"songname" json:"songname"`
	SongURL    string `bson:"songurl" json:"songurl"`
	SongArtist string `bson:"songartist" json:"songartist"`
}
