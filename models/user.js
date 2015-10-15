'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = () => {
  let userSchema = new Schema({
    fname: String,
    lname: String,
    email: { type: String, index: true },
    github: { type: String, index: true },
    twitter: String,
    linkedin: String,

    account: {
      admin: { type: Boolean, default: false },
      active: { type: Boolean, default: false },
      lastlogin: { type: Date, default: Date.now },
      registered: { type: Date, default: Date.now }
    },

    // When a user enrolls in a curriculum add to this array [['Computer Science and Engineering', (monogo_object trakcing progess)]]
    // Front end can generate link to their progress page from this....
    curriculum: [ {
      id: { type: Schema.Types.ObjectId, ref: 'curriculum' },
      started: Date,
      completed: { type: Boolean, default: false },
      progress: [ {
        course: { type: Schema.Types.ObjectId, ref: 'course' },
        started: Date,
        completed: { type: Boolean, default: false },
        verified: { type: Boolean, default: false }
      } ]
    } ],

    /*
    *  We should let users choose whether or not to share a location. If not it can deafult to be based on their ip when they register.
    *  display would allow a user to opt-out of sharing this information on their personal page.
    * just use a city and country for now
    */
    location: {
      public: { type: Boolean, default: true },
      city: String,
      country: String
    }
  });

  return mongoose.model('user', userSchema);
};
