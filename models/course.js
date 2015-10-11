let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = () => {
  let courseSchema = new Schema({
    name: String, // Name of the course
    school: String, // Where the course takes place. i.e. EdX, Coursera, etc
    duration: String, // Duration of course.
    time: String, // time commitment to finish -
    hostaddr: String, // web adress to course page
    category: Schema.Types.ObjectId, // catergory of course --> this may not need it's own schema
    projects: String // link to projects associated with this course  <--not needed?

  });

  courseSchema.statics.createCourse = (newCourse, callback) => {
    newCourse.save(callback);
  };

  return mongoose.model('course', courseSchema);
};
