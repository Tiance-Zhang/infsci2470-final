// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Product = require("../models/product");

router.get("/", function(req,res){
  res.render("index");

});

// RETREIVE all books
router.get("/product", function(req,res){
  Product.find({}, function (err, product_list){
    res.render("product", {products:product_list});
  });
});




module.exports = router;