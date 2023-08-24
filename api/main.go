package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/marsian83/one-panel/api/configs"
	"github.com/marsian83/one-panel/api/src/handlers"
	"github.com/marsian83/one-panel/api/src/mongodb"
	"go.mongodb.org/mongo-driver/mongo"
)

var dbClient *mongo.Client

func main() {
	configs.InitEnvConfigs()

	port := configs.Env.Port

	router := gin.Default()
	router.Use(cors.Default())

	dbClient = mongodb.GetClient()

	router.GET("/ping", handlers.Ping)
	router.GET("/d/:uri", handlers.GetEntries)

	router.Run(fmt.Sprintf(":%s", port))
}
