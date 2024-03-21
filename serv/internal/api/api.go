package api

import (
	"time"
)

type CreateCitizen struct {
	FirstName   string    `json:"first_name" validate:"required"`
	LastName    string    `json:"last_name" validate:"required"`
	DateOfBirth time.Time `json:"date_of_birth" validate:"required"`
	Gender      string    `json:"gender" validate:"required"`
	Address     string    `json:"address" validate:"required"`
	City        string    `json:"city" validate:"required"`
	State       string    `json:"state" validate:"required"`
	Pincode     string    `json:"pincode" validate:"required"`
}

// type CreateCitizenResponse struct {
// 	ID          string    `json:"_id"`
// 	FirstName   string    `json:"first_name"`
// 	LastName    string    `json:"last_name"`
// 	DateOfBirth time.Time `json:"date_of_birth"`
// 	Gender      string    `json:"gender"`
// 	Address     string    `json:"address"`
// 	City        string    `json:"city"`
// 	State       string    `json:"state"`
// 	Pincode     string    `json:"pincode"`
// }

type UpdateCitizen struct {
	ID          string    `json:"_id" validate:"required"`
	FirstName   string    `json:"first_name" validate:"required"`
	LastName    string    `json:"last_name" validate:"required"`
	DateOfBirth time.Time `json:"date_of_birth" validate:"required"`
	Gender      string    `json:"gender" validate:"required"`
	Address     string    `json:"address" validate:"required"`
	City        string    `json:"city" validate:"required"`
	State       string    `json:"state" validate:"required"`
	Pincode     string    `json:"pincode" validate:"required"`
}
