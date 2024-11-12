package services

import (
	"fmt"
	"vibeflow-go-gin-application/models"
)

var users = []models.User{
	{ID: "1", Username: "john", Email: "john@example.com"},
	{ID: "2", Username: "jane", Email: "jane@example.com"},
}

func GetAllUsers() []models.User {
	return users
}

func GetUserByID(id string) (*models.User, error) {
	for _, user := range users {
		if user.ID == id {
			return &user, nil
		}
	}
	return nil, fmt.Errorf("user not found")
}

func CreateUser(user models.User) models.User {
	user.ID = fmt.Sprintf("%d", len(users)+1)
	users = append(users, user)
	return user
}
