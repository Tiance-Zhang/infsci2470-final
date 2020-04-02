const express = require('express');
const router = express.Router();
const Product = require("../models/product");
const Vendor = require("../models/vendor");

router.get("/", function(req,res){
  res.render("index");

});

router.get("/product", function(request, response) {
  Product.find({}, function(err, product_list){
    response.render("product", {
      product: product_list
    })
  })
});

router.get("/vendor", function(request, response) {
  Vendor.find({}, function(err, vendor_list){
    response.render("vendor", {
      vendor: vendor_list
    })
  })
});

module.exports = router;