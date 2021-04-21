const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    Task_id: {type: Number},
    TaskName: {type: String},
    Instructor: {type: String},
    isred: {type: String},
    status: {type: Number},
    Room: {type: String},
    Description: {type: String},
    
  }
);

module.exports = mongoose.model('product', productSchema);