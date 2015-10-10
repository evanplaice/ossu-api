// Create a connection context
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("Connection OK");
  } else {
  	console.log("Connection Fail: Verify the database is running and available on port:27017.");
  	process.exit(1);
  }
});
