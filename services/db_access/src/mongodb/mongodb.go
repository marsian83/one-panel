package mongodb

import (
	"context"
	"sync"

	"github.com/marsian83/one-panel/services/db_access/configs"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	once     sync.Once
	dbClient *mongo.Client
)

func GetClient() *mongo.Client {
	once.Do(func() {
		db_uri := configs.Env.Mongodb_URI

		clientOptions := options.Client().ApplyURI(db_uri)

		client, err := mongo.Connect(context.TODO(), clientOptions)

		if err != nil {
			return
		}

		dbClient = client
	})

	return dbClient
}
