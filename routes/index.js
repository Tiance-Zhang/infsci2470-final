// Route handlers
const express = require('express');
const router = express.Router()
const fetch = require("node-fetch");
const expressip = require('express-ip');
const passport = require('passport');
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");

//import data models
const Look = require("../models/look");
//const Product = require("../products.json");
const User = require("../models/users");


// Route handlers
//const express = require("express");
//const router = express.Router();

//import data models
const Product = require("../models/product");
const vendor = require("../models/vendor");




//test
router.use(expressip().getIpInfoMiddleware);

const ipstack = require('ipstack')
 
router.get('/', function(req, res) {
  const ipInfo = req.ipInfo.ip.substring(0,13);

     res.status(200).render("home",{

     })
  
});

router.get('/signup', function(req, res) { 
    res.render('signup', {
    });
}); 

//Post to sign up
router.post('/signup', function(req, res){
  var myData = new User(req.body);
  
  console.log(myData);
  
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(myData.password, salt, function(err, hash){
      if(err){
        console.log(err);
      }else{
        myData.password = hash;
        myData.save()
    .then(item => {
      res.status(400).redirect("https://final-project-25.glitch.me/profile/" + myData._id)

  })
    .catch(err => {
       res.status(400).send("unable to save to database");
});
      }
    });
  })
});

router.get("/login", function(req,res){
  res.render("login");
});

// router.post("/login", function(req,res,next){
  
//   passport.authenticate("local", {
//     successRedirect: "/login",
//     failureRedirect: "/",
//   })(req,res,next);
// });

router.post("/login", function(req,res,next){
  passport.authenticate("local", (err, user, info) => {
    console.log('err', err);
    console.log('user', user);
    res.send("ok!");
  });
});

router.get('/admin', function(req, res) {
User.find({}, function(req, userlist){
  
  res.render('admin', {
    users: userlist, 
    name: 'jose'})
  });
});


//test over
//

router.get('/signup', function(req, res) { 
    res.render('signup', {
    });
}); 


router.get("/", function(req, res) {
  res.render("index");
});

// RETREIVE all books

router.get("/product", function(request, response) {
  Product.find({}, function(err, product_list) {
    response.render("product", {
      product: product_list
    });
  });
});

// RETREIVE all vendor

router.get("/vendors", function(request, response) {
  vendor.find({}, function(err, vendor_list) {
    response.render("vendors", {
      vendor: vendor_list
    });
  });
});

//




router.get("/addNew", function(request, response, next) {
  Product.find({}, function(err, product_list) {
    try {
      response.render("addNew", { foot: product_list });
    } catch (err) {
      next(err);
    }
  });
});

router.get("/addOne", function(request, response, next) {
  Product.find({}, function(err, product_list) {
    try {
      response.render("addNew", { foot: product_list });
    } catch (err) {
      next(err);
    }
  });
});



router.post("/addone", function(req, res) {
  let product = new Product(req.body);
  product.save();
  res.status(201).send(product);
});








module.exports = router;
