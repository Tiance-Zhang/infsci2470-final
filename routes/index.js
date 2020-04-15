

//import data models
const Look = require("../models/look");
//const Product = require("../products.json");
const User = require("../models/users");


// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Product = require("../models/product");
const vendor = require("../models/vendor");





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
