var mongoose = require('mongoose');

mongoose.connect('/*location of database*/');           

var db = mongoose.connection;
var Schema = mongoose.Schema;

 
module.exports = function () {
  var userSchema = new Schema ({       
    fname:                          String,
    lname:                          String,
    email:                          String,
    username:                       { type: String, index: true }
    admin:                          { type: Boolean, default: false }
    
    // When a user enrolls in a curriculum add to this array [['Computer Science and Engineering', (monogo_object trakcing progess)]]
    // Front end can generate link to their progress page from this....

    curriculum: {
      id:                           ObjectId,
      started:                      Date,
      progress: [ {
        course_id:                  ObjectId,
        started:                    Date,
        status:                     String
      } ]
    }

/*
*  We should let users choose whether or not to share a location. If not it can deafult to be based on their ip when they register. 
*  display would allow a user to opt-out of sharing this information on their personal page.
*  coords [lat: long, lng: long]?
*/


    location: {
      shared:                       { type: Boolean, default: false }   
      city: {
        name:                       String,
        coord:                      /*lat & long*/,
        display:                    { type: Boolean, default: false } 
      }               
    }

/*
* user can add social media profile info, websites and etc, for each add new element to array, need a model for this?
* example:
* [['github', 'waterlooSunset'], ['twitter', '@twitterHandle']]
* 
*
*/
    sites: [ { 
      service:                      String, 
      handle:                       String 
    } ]

/*
*   We'll probably have to deal with this at some point unfortunately
*/

      acct: {
        suspend:                  { type: Boolean, default: false }  
        remove:                   { type: Boolean, default: false }
      }
      
/*
* Maybe some more intersting things to track, or maybe axe this all together.
*/

      meta: {
        lastlogin:                { type: Date, default: Date.now }
        registered:               { type: Date, default: Date.now }  
      }
    

  });
  
  return mongoose.model('user', userSchema);

}


module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}