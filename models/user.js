var mongoose = require('mongoose');

mongoose.connect('/*location of database*/');           

var db = mongoose.connection;
var Schema = mongoose.Schema;

 
module.exports = function () {
  var userSchema = new Schema ({       
    fname:          String,
    lname:          String,
    email:          { type: String, index: true },
    github:         { type: String, index: true },
    twitter:        String,
    linkedin:       String,

    account: {
      admin:        { type: Boolean, default: false },
      active:       { type: Boolean, default: false },
      lastlogin:    { type: Date, default: Date.now },
      registered:   { type: Date, default: Date.now }, 
    },
    
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

  });

  userSchema.statics.createUser = function ( newUser, callback ) {
      newUser.save ( callback );
  }; 

  return mongoose.model( 'user', userSchema );
}