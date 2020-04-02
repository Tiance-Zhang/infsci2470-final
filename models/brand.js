const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {type: Number},
    name: {type: String},
    size: {type: String},
    price: {type: String},
    volumn: {type: String},
  }
);

module.exports = mongoose.model('product', productSchema);