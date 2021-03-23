const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    TaskID: {type: Number},
    TaskName: {type: String},
    Instructor: {type: String},
    status: {type: Number},
    Room: {type: String},
    Description: {type: String},
  }
);

module.exports = mongoose.model('product', productSchema);