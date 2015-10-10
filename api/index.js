var express     = require('express'),
    bodyParser  = require('body-parser'),
    helmet      = require('helmet');

/** 
 * Returns an express router to handle api endpoints.
 * 
*/
module.exports = function() {
    var router = express.Router();

    router.use( helmet() );
    router.use( bodyParser.json() );

    router.get('/sample', function(req, res){
        res.status(200).send('A sample api route.');
    });

    return router;
}