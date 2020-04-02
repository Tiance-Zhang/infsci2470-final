const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {type: String},
    name: {type: String},
    brand: {type: String},
    price: {type: String},
    color: {type: String},
    shoeUrl: {type: String},
  }
);

module.exports = mongoose.model("product", productSchema);