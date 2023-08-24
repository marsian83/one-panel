package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/marsian83/one-panel/api/configs"
	"github.com/marsian83/one-panel/api/src/handlers"
	"github.com/marsian83/one-panel/api/src/helpers"
	"github.com/marsian83/one-panel/api/src/mongodb"
	"go.mongodb.org/mongo-driver/mongo"
)

var dbClient *mongo.Client

func main() {
	configs.InitEnvConfigs()

	port := configs.Env.Port

	router := gin.Default()
	dbClient = mongodb.GetClient()

	router.GET("/ping", handlers.Ping)
	router.GET("/d/:uri", handlers.GetEntries)

	key := []byte(configs.Env.AES_key)
	iv := []byte(configs.Env.AES_iv)

	fmt.Println(string(helpers.EncryptAES(key, iv, []byte("{\"db\":\"onelot1_sometimes\",\"artifact\":\"thikkhai\",\"collection\":\"patla\"}"))))

	router.Run(fmt.Sprintf(":%s", port))
}
