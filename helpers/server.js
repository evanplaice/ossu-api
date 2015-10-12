'use strict';

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

module.exports = app;

function statusRoute (req, res) {
  res.status(200).send('ok');
}
