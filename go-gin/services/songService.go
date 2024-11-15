package services

import (
	"fmt"
	"net/http"
	"runtime"
	"strings"
	"sync"
	"time"
	"vibeflow-go-gin-application/models"

	"github.com/PuerkitoBio/goquery"
	"github.com/go-rod/rod"
	"github.com/go-rod/rod/lib/launcher"
	"github.com/gocolly/colly"
)

// Function to wait for the <ol> element to fully load its <li> tags
func waitForOL(page *rod.Page, selector string) error {
	timeout := time.After(3 * time.Second) // Set a timeout
	ticker := time.NewTicker(300 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-timeout:
			return fmt.Errorf("timeout waiting for <ol> to load")
		case <-ticker.C:
			// Check if any <li> elements exist in the <ol>
			_, err := page.MustElement(selector + " li").HTML()
			if err == nil {
				return nil // <li> elements are present
			}
		}
	}
}

func ScrapeLyrics(songUrl string) ([]string, bool) {

	var songLyrics []string
	var pageHtml, lyricsPageHtml, lyricsUrl string
	var f bool = false

	resp, err := http.Get(songUrl)
	if err != nil || resp.StatusCode != 200 {
		f = true
		return songLyrics, f
	}

	c := colly.NewCollector()

	c.OnHTML("body", func(e *colly.HTMLElement) {

		bodyHTML, bodyHTMLErr := e.DOM.Html()
		if bodyHTMLErr != nil {
			fmt.Println("body html error", bodyHTMLErr)
		} else {
			pageHtml = bodyHTML
		}
	})

	c.Visit(songUrl)

	if pageHtml == "" {
		f = true
		return songLyrics, f
	}

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(pageHtml))
	if err != nil {
		f = true
		return songLyrics, f
	}

	doc.Find("a[title='Song Lyrics']").Each(func(index int, item *goquery.Selection) {
		href, exists := item.Attr("href")
		if exists {
			lyricsUrl = "https://www.jiosaavn.com" + href
		}
	})

	if lyricsUrl == "" {
		f = true
		return songLyrics, f
	}

	c1 := colly.NewCollector()

	c1.OnHTML("body", func(e *colly.HTMLElement) {
		bodyHTML, bodyHTMLErr := e.DOM.Html()

		if bodyHTMLErr != nil {
			fmt.Println("body html error", bodyHTMLErr)
		} else {
			lyricsPageHtml = bodyHTML
		}
	})

	c1.Visit(lyricsUrl)

	if lyricsPageHtml == "" {
		f = true
		return songLyrics, f
	}

	doc1, err := goquery.NewDocumentFromReader(strings.NewReader(lyricsPageHtml))
	if err != nil {
		f = true
		return songLyrics, f
	}

	lyrics := doc1.Find("div#root > div.lyrics > .u-4\\/5-min-vh > div > main > div:nth-child(3) > section > div > p > span")

	// Extract and print the text content of the lyrics
	lyrics.Each(func(i int, s *goquery.Selection) {
		// fmt.Println(s.Text())
		songLyrics = append(songLyrics, s.Text())
	})

	return songLyrics, f

}

func SongMp3Scraper(songUrl string) string {

	var operatingSystem = runtime.GOOS
	var chromeLocation string

	if operatingSystem == "linux" {
		chromeLocation = "/usr/bin/google-chrome"
	} else if operatingSystem == "windows" {
		chromeLocation = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
	}

	// Launch Chrome in headless mode
	l := launcher.New().
		Bin(chromeLocation).
		Headless(true).
		NoSandbox(true).
		Set("disable-infobars", "true").
		Set("disable-gpu", "false").
		Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").
		Set("hide-scrollbars", "true")

	// Launch the browser
	browserURL, err := l.Launch()
	if err != nil {
		fmt.Println("Error launching browser:", err)
		return ""
	}

	// Connect to the browser
	browser := rod.New().ControlURL(browserURL).MustConnect()
	defer browser.MustClose()

	// Open the page
	page := browser.MustPage(songUrl)
	page.MustWaitIdle()

	// Interact with the page to make sure the audio element is rendered
	playBtn := page.MustElement(`a.c-btn.c-btn--primary`)
	playBtn.MustClick()
	page.MustWaitIdle()

	// Locate the audio source element and retrieve the src attribute
	audioSrc, exists := page.MustElement("div.plyr.plyr--full-ui.plyr--audio.plyr--html5 > audio > source").Attribute("src")
	if exists != nil {
		fmt.Println("Error: src attribute not found in audio source tag")
		return ""
	}

	return *audioSrc
}

func ScrapeSongDetails(song models.Song, page *rod.Page) (*models.SongDetails, error) {

	resp, err := http.Get(song.URL)
	if err != nil || resp.StatusCode != 200 {
		return nil, fmt.Errorf("invalid URL: %s, status: %v", song.URL, resp.Status)
	}

	// Load the HTML into goquery for further parsing
	bodyHTML, err := page.MustElement("body").HTML()
	if err != nil {
		return nil, fmt.Errorf("error retrieving HTML: %v", err)
	}

	// fmt.Println(bodyHTML)

	doc, err := goquery.NewDocumentFromReader(strings.NewReader(bodyHTML))
	if err != nil {
		return nil, fmt.Errorf("error parsing HTML: %v", err)
	}

	// Initialize a SongDetails struct
	songDetails := &models.SongDetails{}

	songDetails.SongTitle = song.Title
	songDetails.SongUrl = song.URL

	// Get image URL
	// Find the img element with the class you specify and an alt attribute equal to the song title
	doc.Find("img").Each(func(i int, s *goquery.Selection) {
		// Check if the alt attribute exists and matches the song title
		if alt, exists := s.Attr("alt"); exists && alt == strings.TrimSpace(song.Title) {
			// Set the ImageURL in SongDetails
			if imgURL, exists := s.Attr("src"); exists {
				songDetails.ImageURL = imgURL
			}
		}
	})

	// Get artists' names
	songDetails.Artists = doc.Find("p.u-color-js-gray").Eq(1).Text()
	if songDetails.Artists == "" {
		return nil, fmt.Errorf("artists name not found")
	}

	return songDetails, nil
}

func ScrapeSongs(searchText string) ([]models.SongDetails, error) {
	var operatingSystem = runtime.GOOS
	var chromeLocation string
	var songURLChannel chan []models.Song
	batchSize := 1  // Adjust batch size as needed
	maxWorkers := 6 // Number of worker goroutines

	// Set Chrome location based on the OS
	if operatingSystem == "linux" {
		chromeLocation = "/usr/bin/google-chrome"
	} else if operatingSystem == "windows" {
		chromeLocation = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
	}

	// Launch Chrome in headless mode
	l := launcher.New().
		Bin(chromeLocation).
		Headless(true).
		NoSandbox(true).
		Set("disable-infobars", "true").
		Set("disable-gpu", "false").
		Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36").
		Set("hide-scrollbars", "true")

	// Launch the browser
	browserURL, err := l.Launch()
	if err != nil {
		return nil, fmt.Errorf("error launching browser: %v", err)
	}

	// Connect to the browser
	browser := rod.New().ControlURL(browserURL).MustConnect()
	defer browser.MustClose()

	// Construct the search URL
	jiosaavnsongurl := "https://www.jiosaavn.com/search/song/"
	encodedSearchText := strings.ReplaceAll(strings.ToLower(searchText), " ", "%20")
	searchURL := fmt.Sprintf("%s%s", jiosaavnsongurl, encodedSearchText)

	// Navigate to the search URL
	page := browser.MustPage(searchURL)
	page.MustWaitIdle()

	// Wait for the <ol> tag to be fully loaded
	olSelector := "div#root > div.search > .u-4\\/5-min-vh > div > main > div > div > section > ol"
	err = waitForOL(page, olSelector)
	if err != nil {
		return nil, fmt.Errorf("error waiting for <ol>: %v", err)
	}

	// Load the HTML string into goquery
	bodyHTML := page.MustElement("body").MustHTML()
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(bodyHTML))
	if err != nil {
		return nil, fmt.Errorf("error parsing HTML: %v", err)
	}

	var songs []models.Song
	const jiosaavnhomeurl = "https://www.jiosaavn.com"

	// Extract song titles and URLs
	doc.Find(olSelector + " li div > article > div.o-snippet__item:nth-child(2) > figure > figcaption > h4 > a").
		EachWithBreak(func(i int, s *goquery.Selection) bool {
			if i >= 8 {
				return false
			}

			if songURL, exists := s.Attr("href"); exists {
				fullURL := jiosaavnhomeurl + songURL
				songTitle := s.Text()

				songs = append(songs, models.Song{
					Title: songTitle,
					URL:   fullURL,
				})
			}
			return true
		})

	// WaitGroup to ensure all goroutines finish
	wg := &sync.WaitGroup{}
	mu := &sync.Mutex{}
	wg.Add(maxWorkers)

	// Create a channel for song URL batches
	songURLChannel = make(chan []models.Song, (len(songs)/batchSize)+1)

	// Initialize a slice to hold all song details
	var songDetailsList []models.SongDetails

	// Worker pool
	for i := 0; i < maxWorkers; i++ {
		go func() {
			defer wg.Done()
			for urlBatch := range songURLChannel {
				for _, song := range urlBatch { // Loop through each Song in the batch
					songDetails, err := ScrapeSongDetails(song, page)
					if err != nil {
						fmt.Println("Error scraping song details:", err)
						continue // Skip the current song if there's an error
					}
					// Store the details in a thread-safe way
					mu.Lock() // Lock the mutex
					songDetailsList = append(songDetailsList, *songDetails)
					mu.Unlock() // Unlock the mutex
				}
			}
		}()
	}

	// Send batches of URLs into the channel
	var currentBatch []models.Song
	for _, song := range songs {
		currentBatch = append(currentBatch, song)
		if len(currentBatch) == batchSize {
			songURLChannel <- currentBatch
			currentBatch = nil // Start a new batch
		}
	}

	// Add the final batch if it's not empty
	if len(currentBatch) > 0 {
		songURLChannel <- currentBatch
	}

	// Close the channel and wait for all goroutines to finish
	close(songURLChannel)
	wg.Wait()

	return songDetailsList, nil
}
