package helpers

import (
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

var once sync.Once

// LoadEnv loads environment variables from the .env file (only once)
func LoadEnv() {
	once.Do(func() {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
		// log.Println(".env file loaded successfully")
	})
}

// GetEnv retrieves an environment variable by key
func GetEnv(key string) string {
	return os.Getenv(key)
}
