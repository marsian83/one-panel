package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

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
	fmt.Print(mongodb_hostname)

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
		"message": fmt.Sprintf("User %s created for database %s", userRequest.UserName, userRequest.DBName),
		"code":    0,
		"uri":     fmt.Sprintf("mongodb://%s:%s@%s/%s", userRequest.UserName, userRequest.Password, mongodb_hostname, userRequest.DBName)})
}

func NewEntry(c *gin.Context) {
	type UserRequest struct {
		DBName     string `json:"db_name"`
		Artifact   string `json:"artifact"`
		Collection string `json:"collection"`
		Data       string `json:"data"`
		Type       string `json:"type"`
		Object     string `json:"object	"`
	}

	type Entry struct {
		Name string
		Data interface{}
	}

	mongodb_hostname := configs.Env.Mongodb_Hostname
	fmt.Print(mongodb_hostname)

	var userRequest UserRequest
	if err := c.BindJSON(&userRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	client := mongodb.GetClient()
	db := client.Database(userRequest.DBName)
	collection := db.Collection(userRequest.Artifact)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var newData interface{}
	var err error

	if userRequest.Object == "1" {
		// If Object field is set, parse the JSON data
		err = json.Unmarshal([]byte(userRequest.Object), &newData)
		if err != nil {
			fmt.Println("Error parsing JSON:", err)
			return
		}
	} else {
		// Otherwise, use the data as-is based on the specified type
		switch userRequest.Type {
		case "number":
			newData, err = strconv.Atoi(userRequest.Data)
			if err != nil {
				fmt.Println("Error converting to number:", err)
				return
			}
		default:
			// Default case: use data as string
			newData = userRequest.Data
		}
	}

	existingEntry := Entry{}

	err = collection.FindOne(ctx, bson.M{"name": userRequest.Collection}).Decode(&existingEntry)

	if err == nil {
		// Entry exists, update its value
		update := bson.M{"$set": bson.M{"data": userRequest.Data}}
		_, err := collection.UpdateOne(ctx, bson.M{"name": userRequest.Collection}, update)

		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"message": "Error updating value",
				"code":    1})
		}
	} else {
		// Entry doesn't exist, insert a new one
		newEntry := Entry{Name: userRequest.Collection, Data: newData}
		_, err = collection.InsertOne(ctx, newEntry)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Successfully Created/Updated Entry in %s", userRequest.Collection),
		"code":    0})
}
