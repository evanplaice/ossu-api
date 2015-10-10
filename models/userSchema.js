var mongoose = require('mongoose');

mongoose.connect('/*location of database*/');           

var db = mongoose.connection;
var Schema = mongoose.Schema;

 
module.exports = function () {
  var userSchema = new Schema({       
    name_first:                     String,
    name_last:                      String,
    email_user:                     String,
    //auth info 
    user_name:                      { type: String, index: true }
    is_admin:                       { type: Boolean, default: false }
    
    // for each enrolled curriculum store user curriculum info in a curriculum schema point to document id for this user

    user_curriculum_document: [ 
        { curriculum_name: String, user_curriculum_document_id: Number}
    ]
    
    //For each curriclum user enrolls in create an array storing the name and link to their proilfe page for the curriculum. 

    user_curriculum_enrolled: [
        { curriculum_name: String, user_curriculum_page: String }  
      ]   


/*
*  Not sure how to handle this....
*/

    user_location: {
      //slack discussion about defaulting to IP based location for heat map   
      user_shared_location:         { type: Boolean, default: false }   
      user_city: {
        user_city_name:             String,
        user_city_coord:            /*lat & long*/,
        user_city_display:          { type: Boolean, default: false } 

      }               
    }

/*
* user can add social media profile info, websites and etc, for each add new element to array, need a model for this?
* example:
* [['github', 'https://github.com/waterlooSunset', 'waterlooSunset on Github'], ['twitter', 'https://twitter.com/????', '@??????']]
* 
*
*/
    user_sites: [
        { service: String, link_ref: String, link_display: String }
      ]
      

/*
* Are we confimring new user registrations ?
*/

    account_confirmation_info: {
      confirmed_acct:             { type: Boolean, default: false }
      confirmation_info: {
        date_sent:                Date,                               
        confirm_failed :          { type: Boolean, default: false }       
        failed_reason:            String                          
      }
    }

/*
*   We'll probably have to deal with this at some point unfortunately
*/

      account_info_ugly: {
        suspended:                { type: Boolean, default: false }  
        remove_acct:              { type: Boolean, default: false }
      }
      

      account_info: {
        last_login:               { type: Date, default: Date.now }
        last_post_date:           Date,
        date_registered:          { type: Date, default: Date.now }  
      }
    

  });
  
  mongoose.model("userSchema", userSchema)

}


module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}