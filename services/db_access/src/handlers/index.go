package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
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
	}

	type Entry struct {
		ID   int         `json:"id"`
		Data interface{} `json:"data"`
	}

	type Collection struct {
		Name   string  `bson:"name"`
		Data   []Entry `bson:"data"`
		NextID int     `bson:"next_id"`
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

	if true {
		// If Object field is set, parse the JSON data
		err = json.Unmarshal([]byte(userRequest.Data), &newData)
		if err != nil {
			msg := fmt.Sprintf("Error parsing JSON: %s", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": msg})
			return
		}
	}

	existingCollection := Collection{}

	err = collection.FindOne(ctx, bson.M{"name": userRequest.Collection}).Decode(&existingCollection)

	var nextID int
	if err == nil {
		// Entry exists, update its value
		nextID = existingCollection.NextID
	} else {
		nextID = 0
	}

	if err == nil {
		// Entry exists, update its value
		newEntry := Entry{
			ID:   nextID,
			Data: newData,
		}

		update := bson.M{"$push": bson.M{"data": newEntry}, "$set": bson.M{"next_id": nextID + 1}}
		_, err := collection.UpdateOne(ctx, bson.M{"name": userRequest.Collection}, update)

		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"message": "Error updating value",
				"code":    1})
		}
	} else {
		// Entry doesn't exist, create a new one
		newEntry := Collection{
			Name: userRequest.Collection,
			Data: []Entry{
				{
					ID:   0,
					Data: newData,
				},
			},
			NextID: 1,
		}

		_, err = collection.InsertOne(ctx, newEntry)
	}

	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "Error updating value",
			"code":    1})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Successfully Created/Updated Entry in %s", userRequest.Collection),
		"code":    0})
}

func GetEntries(c *gin.Context) {
	type UserRequest struct {
		DBName     string `json:"db_name"`
		Artifact   string `json:"artifact"`
		Collection string `json:"collection"`
	}

	type Entry struct {
		Name string `bson:"name"`
		Data []struct {
			ID   int         `json:"id"`
			Data interface{} `json:"data"`
		} `bson:"data"`
	}

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

	entry := Entry{}
	fmt.Println(userRequest)
	if err := collection.FindOne(ctx, bson.M{"name": userRequest.Collection}).Decode(&entry); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": entry.Data,
		"code": 0})
}
