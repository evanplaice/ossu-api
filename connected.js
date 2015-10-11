'use strict';

require('dotenv').load();

// Create a connection context
let MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect(process.env.MONGO_URI, function (err, db) {
  if (!err) {
    console.log('Connection OK');
  } else {
    console.log('Connection Fail: Verify the database is running and available on port:27017.');
    process.exit(1);
  }
});
