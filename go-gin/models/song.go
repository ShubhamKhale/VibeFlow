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

type FavouriteSong struct {
	AlbumID           string `json:"album_id"`
	AlbumURL          string `json:"album_url"`
	EncryptedMediaURL string `json:"encrypted_media_url"`
	HasLyrics         string `json:"has_lyrics"`
	Lyrics            string `json:"lyrics"`
	PrimaryArtists    string `json:"primary_artists"`
	PrimaryArtistsID  string `json:"primary_artists_id"`
	SongAudioPreview  string `json:"song_audio_preview"`
	SongAudioURL      string `json:"song_audio_url"`
	SongID            string `json:"song_id"`
	SongImageURL      string `json:"song_image_url"`
	SongName          string `json:"song_name"`
	Vcode             string `json:"vcode"`
}
