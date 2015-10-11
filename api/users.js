var express = require('express');

module.exports = function( db ) {
    var router = express.Router(),
        userModel = db.model( 'user' );

    /** list all users */
    router.get( '/', function( req, res ) {

    });

    /** get user by id */
    router.get( '/:id', function( req, res ) {

    });

    /** save a new user */
    router.post( '/:id', function( req, res) {

    });

    return router;
}