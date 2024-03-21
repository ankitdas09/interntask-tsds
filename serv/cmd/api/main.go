package main

import (
	"context"
	"log"
	"os"

	"github.com/ankitdas09/interntask-tsds/internal/handler"
	"github.com/ankitdas09/interntask-tsds/services"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
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

func initDB() *mongo.Client {
	mongoUri := goDotEnvVariable("MONGO_URI")
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Panic(err)
		}
	}()
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Panic(err)
	}
	log.Println("Connected to database.")
	return client
}

func main() {
	port := goDotEnvVariable("PORT")
	mongoUri := goDotEnvVariable("MONGO_URI")

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoUri))
	if err != nil {
		log.Panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Panic(err)
		}
	}()
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Panic(err)
	}
	log.Println("Connected to database.")
	services.InitMongoService(client)

	log.Println("Starting server on", port)
	app := echo.New()

	app.GET("/insert", handler.CreateUser)

	app.Logger.Fatal(app.Start(":" + port))
}
