package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Citizen struct {
	ID          primitive.ObjectID `bson:"_id" json:"_id"`
	FirstName   string             `bson:"first_name" json:"first_name"`
	LastName    string             `bson:"last_name" json:"last_name"`
	DateOfBirth time.Time          `bson:"date_of_birth" json:"date_of_birth"`
	Gender      string             `bson:"gender" json:"gender"`
	Address     string             `bson:"address" json:"address"`
	City        string             `bson:"city" json:"city"`
	State       string             `bson:"state" json:"state"`
	Pincode     string             `bson:"pincode" json:"pincode"`
}
