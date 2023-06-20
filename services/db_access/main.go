package main

import (
	"github.com/gin-gonic/gin"
	"github.com/marsian83/one-panel/services/db_access/src/db"

	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile("./pkg/common/envs/.env")
	viper.ReadInConfig()

	port := viper.Get("PORT").(string)
	dbUrl := viper.Get("DB_URL").(string)

	router := gin.Default()
	h := db.Connect(dbUrl)

	h.Database("")

	router.GET("/new", getBooks)
	router.POST("/books", createBook)
	router.GET("/books/:id", bookByID)
	router.PATCH("/checkout", checkboutBook)

	router.Run(port)
}
