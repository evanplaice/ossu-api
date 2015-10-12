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
mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI : process.env.MONGO_URI);

db = mongoose.connection;

app.set('db', db);

// compile models
fs.readdirSync('./models/').forEach((file) => {
  require('./models/' + file)();
});

// mount the api router
app.use('/api', Api(app));

  // TODO: mount an auth router
// db.once('open', onDatabaseConnection);
module.exports = app;

app.listen(process.env.PORT || 8080, () => {
  console.log('Server listening on port', process.env.PORT);
});

