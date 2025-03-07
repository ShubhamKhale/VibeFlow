package helpers

import (
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

var (
	envMap map[string]string // To store environment variables
	once   sync.Once         // Ensure .env is loaded only once
)

// LoadEnv loads environment variables from the .env file (only once)
func LoadEnv() {
	once.Do(func() {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}

		envMap = make(map[string]string)
		for _, env := range os.Environ() {
			pair := splitEnv(env)
			envMap[pair[0]] = pair[1]
		}
	})
}

// GetEnv retrieves an environment variable by key
func GetEnv(key string) string {
	LoadEnv() // Ensure env is loaded once
	return envMap[key]
}

// splitEnv splits the environment variable into key-value pair
func splitEnv(env string) []string {
	for i := 0; i < len(env); i++ {
		if env[i] == '=' {
			return []string{env[:i], env[i+1:]}
		}
	}
	return []string{env, ""}
}
