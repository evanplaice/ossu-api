'use strict';

// load env variables
require('dotenv').load();

// load deps
let express = require('express');
let Api = require('./api');
let mongoose = require('mongoose');
let fs = require('fs');

// load the app
let app = express();
let db;

// connect to the db
mongoose.connect(process.env.MONGO_URI);
db = mongoose.connection;

db.once('open', onDatabaseConnection);

/**
 * When the database is ready, mount the app routes.
 * app.get('db') will return the database connection.
 */
function onDatabaseConnection () {
  // set the connection object to be used in api files
  app.set('db', db);

  // compile models
  fs.readdirSync('./models/').forEach( (file) => {
    require('./models/' + file)();
  });

  // mount the api router
  app.use('/api', Api(app));

  // TODO: mount an auth router
  // app.use('/auth', Auth());

  // start the server
  app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port', process.env.PORT);
  });
}
