var mongoose = require('mongoose');
    Schema = mongoose.Schema;

 
module.exports = () => {
  var curriculumSchema = new Schema ({       
    name:           { type: String, index: true }, //Name of the curriculm
    categories:     [ { category_id: Schema.types.ObjectId } ]  
    }

  });

  curriculumSchema.statics.createCurriculum =  (newCurriculum, callback) => {
      newCurriculum.save(callback);
  }; 

  return mongoose.model('curriculm', curriculumSchema);
}