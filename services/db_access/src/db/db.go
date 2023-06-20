package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect(db_uri string) *mongo.Client {
	clientOptions := options.Client().ApplyURI(db_uri)

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatalln(err)
	}

	return client
}
