'use strict';

// load env variables
require('dotenv').load();

// load deps
let app = require('./helpers/server');

// get database
let db = app.get('db');

// load routers
let Api = require('./api');

db['database'].once('connected', startServer);

module.exports = app;

function startServer () {
  // set the api routes
  app.use('/api', Api(app));

  app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port', process.env.PORT);
  });
}

