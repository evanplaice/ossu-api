//load env variables
require('dotenv').load();
//load deps
var express = require('express'),
    Api     = require('./api');
    
//load the app
var app = express();

//mount the api router
app.use( '/api', Api() );

//TODO: mount an auth router
// app.use( '/auth', Auth() );

//start the server
app.listen( process.env.PORT || 8080, function(){
    console.log( 'Server listening on port', process.env.PORT );
});