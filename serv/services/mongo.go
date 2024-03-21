package services

import (
	"context"
	"time"

	"github.com/ankitdas09/interntask-tsds/internal/api"
	"github.com/ankitdas09/interntask-tsds/internal/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client
var coll *mongo.Collection

func InitMongoService(c *mongo.Client) {
	client = c
	coll = client.Database("main").Collection("citizen")
}

func FetchCitizens(page int, limit int) (*[]model.Citizen, error) {
	skip := (page - 1) * limit
	opts := options.Find()
	opts.SetSkip(int64(skip))
	opts.SetLimit(int64(limit))
	filter := bson.D{{}}

	cursor, err := coll.Find(context.TODO(), filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	var citizens []model.Citizen
	err = cursor.All(context.TODO(), &citizens)
	if err != nil {
		return nil, err
	}

	return &citizens, nil
}

// Returns newly createded Citizen's _id and possibly an err
func InsertNewCitizen(c *api.CreateCitizen) (*model.Citizen, error) {
	var citizen model.Citizen

	citizen.ID = primitive.NewObjectID()
	citizen.FirstName = c.FirstName
	citizen.LastName = c.LastName
	// citizen.DateOfBirth = c.DateOfBirth
	citizen.DateOfBirth = time.Now()
	citizen.Gender = c.Gender
	citizen.Address = c.Address
	citizen.City = c.City
	citizen.State = c.State
	citizen.Pincode = c.Pincode

	_, err := coll.InsertOne(context.TODO(), citizen)
	if err != nil {
		return nil, err
	}
	return &citizen, nil
}

func UpdateCitizen(c *api.UpdateCitizen) error {
	id, err := primitive.ObjectIDFromHex(c.ID)
	if err != nil {
		return err
	}
	filter := bson.D{{Key: "_id", Value: id}}
	update := bson.D{
		{
			Key: "$set",
			Value: bson.D{
				{Key: "first_name", Value: c.FirstName},
				{Key: "last_name", Value: c.LastName},
				{Key: "date_of_birth", Value: c.DateOfBirth},
				{Key: "gender", Value: c.Gender},
				{Key: "address", Value: c.Address},
				{Key: "city", Value: c.City},
				{Key: "state", Value: c.State},
				{Key: "pincode", Value: c.Pincode},
			},
		},
	}
	_, err = coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		return err
	}

	return nil
}

func DeleteCitizen(id string) error {
	_id, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	filter := bson.D{{Key: "_id", Value: _id}}
	_, err = coll.DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}
	return nil
}
