'use strict';

// load deps
let db = {};
let mongoose = require('mongoose');

let loader = require('./loader');

const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI;

// connect to the database
mongoose.connect(MONGO_URI);

// Load models
loadModels();

db['database'] = mongoose.connection;

db['database'].on('connected', onDatabaseConnection);
db['database'].on('disconnected', onDatabaseDisconnection);
db['database'].on('error', onDatabaseError);

module.exports = db;

/**
 *
 * Load all models in database
 *
 */
function loadModels () {
  loader('models').forEach((model) => {
    db[model.name] = model.File();
  });
}

/**
 *
 * When the database is ready, load the models.
 *
 */
function onDatabaseConnection () {
  console.log('Database connection is open!');
}

/**
 *
 * When the database is disconnected, log it!
 *
 */
function onDatabaseDisconnection () {
  console.log('Database connection is lost');
}

/**
 *
 * When the database has an error, log it!
 *
 */
function onDatabaseError (err) {
  console.log('Database connection has an error: ' + err);
}

