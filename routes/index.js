

//import data models
const Look = require("../models/look");
//const Product = require("../products.json");
const User = require("../models/users");


// Route handlers
// Route handlers
const express = require('express');
const router = express.Router()
const fetch = require("node-fetch");
const expressip = require('express-ip');
const passport = require('passport');
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");


//import data models
const Product = require("../models/product");
const vendor = require("../models/vendor");

//

router.use(expressip().getIpInfoMiddleware);

const ipstack = require('ipstack')

//log home

router.get('/home', function(req, res) {
  const ipInfo = req.ipInfo.ip.substring(0,13);

     res.status(200).render("home",{

     })
  
});



// sign up

router.get("/login", function(req,res){
  res.render("login");
});

router.get('/signup', function(req, res) { 
    res.render('signup', {
    });
}); 

//admin



//main

router.get("/", function(req, res) {
  res.render("index");
});

// lognin
router.post('/login', function(req,res,next){
  passport.authenticate("local", (err, user, info) => {
    console.log('err', err);
    console.log('user', user);
    res.send("ok!");
  });
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
