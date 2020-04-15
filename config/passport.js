const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");
const Config = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(email, password, done) {
      User.findOne({email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done;
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });
      });
  }));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  return passport;
};
