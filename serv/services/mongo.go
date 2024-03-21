package services

import (
	"context"

	"github.com/ankitdas09/interntask-tsds/internal/model"
	"go.mongodb.org/mongo-driver/mongo"
)

var client *mongo.Client

func InitMongoService(c *mongo.Client) {
	client = c
}

// Returns newly createded user's _id and possibly an err
func InsertNewUser(user *model.User) (interface{}, error) {
	coll := client.Database("main").Collection("user")
	res, err := coll.InsertOne(context.TODO(), user)
	if err != nil {
		return nil, err
	}
	return res.InsertedID, nil
}
