const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
// load admin
const Admin = require('../models/Admin');

const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));


// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


// adminLogin Page
router.get('/adminlogin', forwardAuthenticated, (req, res) => res.render('adminlogin'));



// adminLogin
router.post('/adminlogin', (req, res, next) => {
 const { email, password} = req.body;
   let errors = [];
  if(email == 'admin@pitt.edu')
    {
      if(password == 'adminadmin')
        {
          res.redirect('/product');
        }
      else{
errors.push({ msg: 'Wrong password' });
      }
    }
  else
    {

errors.push({ msg: 'No Account' });
    }
});

// admin Register Page
router.get('/adminregister', forwardAuthenticated, (req, res) => res.render('adminregister'));

// admin Register
router.post('/adminregister', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('adminregister', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Admin.findOne({ email: email }).then(admin => {
      if (admin) {
        errors.push({ msg: 'Email already exists' });
        res.render('adminregister', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newAdmin = new Admin({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(admin => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/adminlogin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



module.exports = router;
