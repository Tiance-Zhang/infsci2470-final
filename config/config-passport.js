const bcrypt = require("bcryptjs");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/users");

const authStrategy = new LocalStrategy((email, password, done) => {
  console.log('local strat', email, password);
  return done(true);
//   User.findOne({email: email }, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (!user) {
//       return done(null, false, { message: "Incorrect email." });
//     }

//     bcrypt.compare(password, user.password, function(err, isMatch) {
//       if (err) throw err;
//       if (isMatch) {
//         return done;
//       } else {
//         return done(null, false, { message: "Incorrect password." });
//       }
//     });
//   });
});

module.exports = authStrategy;