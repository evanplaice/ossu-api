// the command to execute
var command = process.argv[2] || '--create';

// collection name (defaults to 'profiles')
var name = process.argv[3] || "profiles";

// database URI
var url = "mongodb://localhost:27017/ossu";

// Create a connection context
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Connect to the db
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  //console.log("Connected");

  if (command === "--create") { 
    create(db, function() {
      db.close();
    });
  } else if (command === '--destroy') {
    destroy(db, function() { 
      db.close();
    });  
  } else {
    console.log("error: unknown command " + command);
  }
});

// creates a collection
var create = function(db, callback) {
  db.createCollection(name, function(err, collection) {
    if (!err) {
      console.log("Collection: '" + name + "' created successfully");
      process.exit();
    } else {
      console.log("Collection: '" + name + "' creation failed");
      process.exit(1);
    }
  });
};

// destroys a collection
var destroy = function(db, callback) {
  db.collection(name).drop(function (err, collection) {
    if (!err) {
      console.log("Collection: '" + name + "' deleted successfully");
      process.exit();
    } else {
      console.log("Collection: '" + name + "' deletion failed");
      process.exit(1);
    }
  });
};