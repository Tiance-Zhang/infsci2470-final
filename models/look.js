// Data Model for looks
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const now = new Date();

const LookSchema = new Schema(
  {
    userId: {type: String,},
    image: {type: String, required: "What's a look without a photo?"},
    products: {type: [{
      type: Object,
    }
    ]},
    tags: {type: []},
    dateTime: {type: Date, default: Date.now}
  }
);

// Export model
module.exports = mongoose.model("look", LookSchema);