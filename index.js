//load env variables
require('dotenv').load();
//load deps
var express = require('express'),
    Api     = require('./api'),
    mongoose = require('mongoose'),
    fs      = require('fs');
    
//load the app
var app = express(),
    db;

//connect to the db
mongoose.connect( process.env.MONGO_URI );
db = mongoose.connection;

db.once( 'open', onDatabaseConnection ); 




/**
 * When the database is ready, mount the app routes.
 * app.get('db') will return the database connection.
 */
function onDatabaseConnection() {
    //set the connection object to be used in api files
    app.set( 'db', db );

    //compile models
    fs.readdirSync( './models/' ).forEach(function (file) {
        require( './models/' + file )();
    });

    //mount the api router
    app.use( '/api', Api(app) );

    //TODO: mount an auth router
    // app.use( '/auth', Auth() );

    //start the server
    app.listen( process.env.PORT || 8080, function(){
        console.log( 'Server listening on port', process.env.PORT );
    });

}