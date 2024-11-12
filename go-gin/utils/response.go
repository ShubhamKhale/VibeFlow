package utils

import (
	"github.com/gin-gonic/gin"
)

func SendResponse(c *gin.Context, statusCode int, data interface{}) {
	c.JSON(statusCode, gin.H{"data": data})
}

func RespondJSON(c *gin.Context, status int, payload interface{}) {
	c.JSON(status, payload)
}

func RespondError(c *gin.Context, status int, message string) {
	c.JSON(status, gin.H{"error": message})
}
