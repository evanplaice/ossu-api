'use strict';

// load env variables
require('dotenv').load();

// load deps
let express = require('express');

// load database
let db = require('../helpers/database');

// load routers
let Api = require('../api');

// load the app
let app = express();

app.set('db', db);

// set status API
app.get('/', statusRoute);


db['database'].once('connected', startServer);

function startServer () {
  // set the api routes
  app.use('/api', Api(app));

  app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port', process.env.PORT);
  });
}

function statusRoute (req, res) {
  res.status(200).send('ok');
}
