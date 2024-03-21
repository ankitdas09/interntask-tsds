package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id"`
	FirstName   string             `bson:"first_name,omitempty"`
	LastName    string             `bson:"last_name,omitempty"`
	DateOfBirth time.Time          `bson:"date_of_birth,omitempty"`
	Gender      string             `bson:"gender,omitempty"`
	Address     string             `bson:"address,omitempty"`
	City        string             `bson:"city,omitempty"`
	State       string             `bson:"state,omitempty"`
	Pincode     string             `bson:"pincode,omitempty"`
}
