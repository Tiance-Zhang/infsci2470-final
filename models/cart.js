const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  email: "",
  product_list: []
});

module.exports = mongoose.model("cart", cartSchema);
