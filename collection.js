'use strict';

require('dotenv').load();
// the command to execute
let command = process.argv[2] || '--create';

// collection name (defaults to 'profiles')
let name = process.argv[3] || 'profiles';

// database URI
let url = process.env.MONGO_URI;

// Create a connection context
let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

// Connect to the db
MongoClient.connect(url, function (err, db) {
  assert.equal(null, err);
  // console.log("Connected");

  if (command === '--create') {
    create(db, function () {
      db.close();
    });
  } else if (command === '--destroy') {
    destroy(db, function () {
      db.close();
    });
  } else {
    console.log(`error: unknown command ${command}`);
  }
});

// creates a collection
let create = function (db, callback) {
  db.createCollection(name, function (err, collection) {
    if (!err) {
      console.log(`Collection: ${name} created successfully`);
      process.exit();
    } else {
      console.log("Collection: '" + name + "' creation failed");
      process.exit(1);
    }
  });
};

// destroys a collection
let destroy = function (db, callback) {
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
