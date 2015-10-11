var mongoose = require('mongoose');
    Schema = mongoose.Schema;

 
module.exports =  () => {
  var categorySchema = new Schema ({       
    name:           { type: String, index: true } //Name of the category
    curriculum:     ObjectId, //Curriculum to which the category belongs
    courses:        [ { name: Shema.types.ObjectId } ]  
    }

  });

  categorySchema.statics.createCategory = (newCategory, callback) => {
      newCategory.save(callback);
  }; 

  return mongoose.model('category', categorySchema);
}