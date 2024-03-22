package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/ankitdas09/interntask-tsds/internal/handler"
	"github.com/ankitdas09/interntask-tsds/services"
	"github.com/go-playground/validator"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return nil
}

func connectDB() *mongo.Client {
	mongoUri := goDotEnvVariable("MONGO_URI")

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Panic(err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Panic(err)
	}

	log.Println("Connected to database.")
	return client
}

func main() {
	port := goDotEnvVariable("PORT")

	client := connectDB()
	services.InitMongoService(client)
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Panic(err)
		}
	}()

	log.Println("Starting server on", port)
	app := echo.New()
	app.Validator = &CustomValidator{validator: validator.New()}
	app.Use(middleware.CORS())

	app.GET("/", handler.FetchCitizens)
	app.POST("/", handler.CreateCitizen)
	app.PUT("/", handler.UpdateCitizen)
	app.DELETE("/:id", handler.DeleteCitizen)

	app.Logger.Fatal(app.Start(":" + port))
}
