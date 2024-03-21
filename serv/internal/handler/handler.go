package handler

import (
	"log"

	"github.com/ankitdas09/interntask-tsds/internal/api"
	"github.com/ankitdas09/interntask-tsds/services"
	"github.com/labstack/echo/v4"
)

func CreateCitizen(c echo.Context) error {
	var newCitizen api.CreateCitizen

	err := c.Bind(&newCitizen)
	if err != nil {
		log.Println(err)
		return err
	}
	err = c.Validate(newCitizen)
	if err != nil {
		log.Println(err)
		return err
	}

	_newCitizen, err := services.InsertNewCitizen(&newCitizen)
	if err != nil {
		log.Println(err)
		return err
	}

	return c.JSON(201, _newCitizen)
}

func UpdateCitizen(c echo.Context) error {
	var citizen api.UpdateCitizen

	err := c.Bind(&citizen)
	if err != nil {
		log.Println(err)
		return err
	}

	err = c.Validate(citizen)
	if err != nil {
		log.Println(err)
		return err
	}

	err = services.UpdateCitizen(&citizen)
	if err != nil {
		log.Println(err)
		return err
	}
	return c.String(200, "Updated")
}

func DeleteCitizen(c echo.Context) error {
	id := c.Param("id")
	err := services.DeleteCitizen(id)
	if err != nil {
		return err
	}
	return c.String(200, "Deleted")
}
