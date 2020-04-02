const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {type: Number},
    name: {type: String},
    email: {type: String},
    tel: {type: String},
    sign: {type: String},
  }
);

module.exports = mongoose.model('product', productSchema);