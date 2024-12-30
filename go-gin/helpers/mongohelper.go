package helpers

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDB client
var client *mongo.Client

// Initialize MongoDB client
func InitMongoClient() {

	// load environment variables once
	LoadEnv()

	// Retrieve the mongodb url
	mongourl := GetEnv("mongo_url")
	if mongourl == "" {
		fmt.Println("mongo_url not found in environment variables")
	}

	fmt.Println("mongourl", mongourl)

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second) // Set timeout
	defer cancel()                                                           // Ensure cancellation to avoid context leak

	var err error
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongourl))
	if err != nil {
		fmt.Printf("MongoDB connection error: %s\n", err.Error())
		return
	}

	// Verify connection
	err = client.Ping(ctx, nil)
	if err != nil {
		fmt.Printf("MongoDB ping error: %s\n", err.Error())
		return
	}

	fmt.Println("Connected to MongoDB!")
}

// Get one document from a collection
func MongoGetOneDocument(collectionName string, filter interface{}) (bson.M, error) {

	// load environment variables once
	LoadEnv()

	// Retrieve the  mongodb database name
	dbname := GetEnv("mongo_dbname")
	if dbname == "" {
		log.Fatal("mongo_dbname not found in environment variables")
	}

	collection := client.Database(dbname).Collection(collectionName)
	var result bson.M
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Get multiple documents from a collection

func MongoGetMultipleDocuments(collectionName string, filter interface{}, limit int64, offset int64) ([]bson.M, error) {

	// load environment variables once
	LoadEnv()

	// Retrieve the mongodb database name
	dbname := GetEnv("mongo_dbname")
	if dbname == "" {
		log.Fatal("mongo_dbname not found in environment variables")
	}

	collection := client.Database(dbname).Collection(collectionName)
	var results []bson.M

	// Set the limit and offset for the query
	findOptions := options.Find()
	if limit > 0 {
		findOptions.SetLimit(limit)
	}
	if offset > 0 {
		findOptions.SetSkip(offset)
	}

	cursor, err := collection.Find(context.TODO(), filter, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

// Add one document to a collection
func MongoAddOneDocument(collectionName string, document interface{}) (*mongo.InsertOneResult, error) {

	// load environment variables once
	LoadEnv()
	// Retrieve the  mongodb database name
	dbname := GetEnv("mongo_dbname")
	if dbname == "" {
		log.Fatal("mongo_dbname not found in environment variables")
	}
	// fmt.Println("dbname :- ", dbname)
	// fmt.Println("collection name :- ", collectionName)
	// fmt.Println("document :- ", document)
	collection := client.Database(dbname).Collection(collectionName)
	result, err := collection.InsertOne(context.TODO(), document)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Add multiple documents to a collection
func MongoAddMultipleDocuments(collectionName string, documents []interface{}) (*mongo.InsertManyResult, error) {

	// load environment variables once
	LoadEnv()

	// Retrieve the  mongodb database name
	dbname := GetEnv("mongo_dbname")
	if dbname == "" {
		log.Fatal("mongo_dbname not found in environment variables")
	}

	collection := client.Database(dbname).Collection(collectionName)
	result, err := collection.InsertMany(context.TODO(), documents)
	if err != nil {
		return nil, err
	}
	return result, nil
}

// Function to check whether the document exist in mongo or not
func MongoDocumentExist(collectionName string, filter bson.M) (bool, bson.M, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Retrieve the  mongodb database name
	dbname := GetEnv("mongo_dbname")
	if dbname == "" {
		log.Fatal("mongo_dbname not found in environment variables")
	}

	collection := client.Database(dbname).Collection(collectionName)

	var result bson.M
	err := collection.FindOne(ctx, filter).Decode(&result)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return false, nil, nil // Document does not exist
		}
		return false, nil, err // other errors
	}
	return true, result, nil // Document exists
}
