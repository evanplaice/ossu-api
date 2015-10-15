'use strict';

// load env variables
require('dotenv').load();

// load deps
let express = require('express');

// load database
let db = require('../helpers/database');

// load the app
let app = express();

// set the database
app.set('db', db);

// set status API route
app.get('/status', statusRoute);
app.all('/', (req, res) => { res.redirect('/status'); });

// load routers
let Api = require('../api');

db['database'].once('connected', startServer);

module.exports = app;

function startServer () {
  // set the api routes
  app.use('/api', Api(app));
}

function statusRoute (req, res) {
  res.status(200).send('ok');
}
