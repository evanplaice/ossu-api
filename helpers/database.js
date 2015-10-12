'use strict'

// load deps
let db = {};
let mongoose = require('mongoose');

let loader = require('./loader');

//connect to the database
mongoose.connect(process.env.MONGO_URI);
db['database'] = mongoose.connection;

db['database'].on('connected', onDatabaseConnection);
db['database'].on('disconnected', onDatabaseDisconnection);
db['database'].on('error', onDatabaseError);

module.exports = db;

/**
 *
 * When the database is ready, load the models.
 *
 */
function onDatabaseConnection () {
  console.log('Database connection is open!');

  loader('models').forEach( (model) => {
    db[model.name] = model.klass();
  });
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

/**
 *
 * Check if the file in target is loadable
 *
 */
function isLoadable (name) {
  return /\.(js|coffee|lf)$/.test(name);
}
