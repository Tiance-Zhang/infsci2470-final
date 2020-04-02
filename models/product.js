const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema(
  {
    id: {type: Number},
    name: {type: String},
    brand: {type: String},
    price: {type: String},
    color: {type: String},
    shoeUrl: {type: String},
  }
);

module.exports = mongoose.model('vendor', vendorSchema);