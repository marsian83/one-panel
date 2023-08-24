package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/marsian83/one-panel/api/src/helpers"
	"github.com/marsian83/one-panel/api/src/mongodb"
	"go.mongodb.org/mongo-driver/bson"
)

func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func GetEntries(c *gin.Context) {
	type Meta struct {
		DBName     string `json:"db"`
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

	uri := (c.Param("uri"))

	rawJson, err := helpers.DecryptAES(uri)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
	}

	var meta Meta
	if err := json.Unmarshal([]byte(rawJson), &meta); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid URI"})
		return
	}

	client := mongodb.GetClient()
	collection := client.Database(meta.DBName).Collection(meta.Artifact)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	entry := Entry{}

	fmt.Println(meta)

	if err := collection.FindOne(ctx, bson.M{"name": meta.Collection}).Decode(&entry); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to fetch collection entry"})
		return
	}

	c.JSON(http.StatusOK, entry.Data)
}
