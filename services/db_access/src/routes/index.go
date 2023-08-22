package routes

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/marsian83/one-panel/services/db_access/configs"
	"github.com/marsian83/one-panel/services/db_access/src/mongodb"
	"go.mongodb.org/mongo-driver/bson"
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func AllotDatabase(c *gin.Context) {
	type UserRequest struct {
		DBName   string `json:"db_name"`
		UserName string `json:"username"`
		Password string `json:"password"`
	}

	mongodb_hostname := configs.Env.Mongodb_Hostname

	var userRequest UserRequest
	if err := c.BindJSON(&userRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	client := mongodb.GetClient()

	db := client.Database(userRequest.DBName)

	db.RunCommand(context.TODO(), bson.D{
		{Key: "createUser", Value: userRequest.UserName},
		{Key: "pwd", Value: userRequest.Password},
		{Key: "roles", Value: bson.A{
			bson.D{
				{Key: "role", Value: "readWrite"},
				{Key: "db", Value: userRequest.DBName},
			},
		}},
	})

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("User created for %s in %s", userRequest.UserName, userRequest.DBName),
		"uri":     fmt.Sprintf("mongodb://%s:%s@%s/%s", userRequest.UserName, userRequest.Password, mongodb_hostname, userRequest.DBName)})
}
