package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/marsian83/one-panel/services/db_access/configs"
	"github.com/marsian83/one-panel/services/db_access/src/handlers"
	"github.com/marsian83/one-panel/services/db_access/src/mongodb"
	"go.mongodb.org/mongo-driver/mongo"
)

var dbClient *mongo.Client

func main() {
	configs.InitEnvConfigs()

	port := configs.Env.Port

	router := gin.Default()
	dbClient = mongodb.GetClient()

	router.GET("/ping", handlers.Ping)
	router.GET("/entries", handlers.GetEntries)
	router.POST("/allocate", handlers.AllotDatabase)
	router.POST("/entry", handlers.NewEntry)

	router.Run(fmt.Sprintf(":%s", port))
}
