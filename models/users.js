// Data Model for profiles/users with passowrds hashed 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
        email:       {type: String},
        password:    {type: String},
    
});

module.exports = mongoose.model('user', userSchema);