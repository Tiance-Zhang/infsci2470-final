// Route handlers
const express = require('express');
const router = express.Router()

//import data models
const Product = require("../models/product");

// RETREIVE all books
router.get("/", function(req,res){
  Product.find({}, function (err, product_list){
    res.render("index", {products:product_list});
  });
});


module.exports = router;