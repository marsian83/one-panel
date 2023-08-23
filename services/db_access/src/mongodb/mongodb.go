package mongodb

import (
	"context"
	"reflect"
	"sync"

	"github.com/marsian83/one-panel/services/db_access/configs"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/bsontype"
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

		tM := reflect.TypeOf(bson.M{})
		reg := bson.NewRegistryBuilder().RegisterTypeMapEntry(bsontype.EmbeddedDocument, tM).Build()
		clientOptions := options.Client().ApplyURI(db_uri).SetRegistry(reg)

		client, err := mongo.Connect(context.TODO(), clientOptions)

		if err != nil {
			return
		}

		dbClient = client
	})

	return dbClient
}
