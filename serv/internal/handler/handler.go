package handler

import (
	"fmt"
	"log"
	"time"

	"github.com/ankitdas09/interntask-tsds/internal/model"
	"github.com/ankitdas09/interntask-tsds/services"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateUser(c echo.Context) error {
	newUser := model.User{
		ID:          primitive.NewObjectID(),
		FirstName:   "FNAME",
		LastName:    "LName",
		DateOfBirth: time.Now(),
		Gender:      "Male",
		Address:     "IIT Ghy",
		City:        "Ghy",
		State:       "Assam",
		Pincode:     "781039",
	}
	_id, err := services.InsertNewUser(&newUser)
	if err != nil {
		log.Println(err)
		return err
	}
	return c.String(201, fmt.Sprintf("Inserted %s", _id))
}

func DeleteUser(c echo.Context) error {
	return c.String(201, fmt.Sprintf("Deleted"))
}
