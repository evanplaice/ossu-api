let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = () => {
  let curriculumSchema = new Schema({
    name: { type: String, index: true }, // Name of the curriculm
    categories: [ {
      name: String,
      courses: [Schema.Types.ObjectId]
    } ]

  });

  curriculumSchema.statics.createCurriculum = (newCurriculum, callback) => {
    newCurriculum.save(callback);
  };

  return mongoose.model('curriculm', curriculumSchema);
};
