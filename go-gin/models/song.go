package models

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
