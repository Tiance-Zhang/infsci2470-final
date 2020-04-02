// Route handlers
const express = require("express");
const router = express.Router();

//import data models
const Product = require("../models/product");

//router.get("/", function(req, res) {
//  res.render("index");
//});

// RETREIVE all books

router.get("/product", function(request, response) {
  Product.find({}, function(err, product_list) {
    response.render("product", {
      product: product_list
    });
  });
});

module.exports = router;
