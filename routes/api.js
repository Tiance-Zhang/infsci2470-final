// Route handlers
const express = require('express');
const router = express.Router()
// import data models
const Product = require("../models/product");
const Vendor = require("../models/vendor");

// RETREIVE all resources
router.get("/list", function(req,res){
  Product.find({}, function (err, product_list){
    Vendor.find({}, function (err, vendor_list){
      if(err){
      res.status(500).send(err);
    }else{
      res.json({product:product_list,vendor:vendor_list});
    }
    });
    
  });
  
});

router.get("/product", function(req,res){
  Product.find({}, function (err, product_list){
    if(err){
      res.status(500).send(err);
    }else{
    res.json(product_list);
    }
  });
});

// router.get("/vendor", function(request, response, next) {
//   Vendor.find({}, function(err, vendor_list) {
//     response.json(vendor_list);
//   });
// });
router.get("/vendor", function(req,res){
  Vendor.find({}, function (err, vendor_list){
    if(err){
      res.status(500).send(err);
    }else{
    res.json(vendor_list);
    }
  });
});
// retrive a specific product
router.get("/:productId", function(req, res){
  Product.findById(req.params.productId, function(err, product) {
    if(err){
      res.status(500).send(err);
    }else{
    res.json(product)
    }
  });
});

// retrive a specific vendor
router.get("/:vendorId/vendor", function(req, res){
  Vendor.findById(req.params.vendorId, function(err, vendor) {
    if(err){
      res.status(500).send(err);
    }else{
    res.json(vendor)
    }
  });
});

//CREATE new product
router.post('/newproduct', function(req, res){
  let product = new Product(req.body);
  product.save();
  res.status(201).send(product);
});

//CREATE multiple new products
router.post("/newproducts", function(req, res) {
  Product.estimatedDocumentCount({}, function(err, count) {
    
    let product = req.body;
    for (let i = 0; i < product.length; i++) {
      let product = new Product(product[i]);
      
      product.save();
      
    }
    res.status(201).send(product);
  });
});


//CREATE new vendor
router.post('/newvendor', function(req, res){
  let vendor = new Vendor(req.body);
  vendor.save();
  res.status(201).send(vendor);
});

//UPDATE  product
/*router.put("/product/:productId", function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    if(err){
      res.status(500).send(err);
    }else{
    product.id = req.body.id;
    product.name = req.body.name;
    product.size = req.body.size;
    product.price = req.body.price;
    product.volumn = req.body.volumn;
      
    product.save();
    res.json(product);
    }
  });
});

//UPDATE the vendor
router.put("/vendor/:vendorId", function(req, res) {
  Vendor.findById(req.params.vendorId, function(err, vendor) {
    if(err){
      res.status(500).send(err);
    }else{
    vendor.id = req.body.id;
    vendor.name = req.body.name;
    vendor.email = req.body.email
    vendor.tel = req.body.tel;
    vendor.product = req.body.product;

    vendor.save();
    res.json(vendor);
    }
  });
});

//DELETE the product
router.delete("/product/:productId", function(req, res){
  Product.findById(req.params.productId, function(err, product) {
    product.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).send('Its removed');
        }
    });
  });
});

//DELETE the vendor
router.delete("/vendor/:vendorId", function(req, res){
  Vendor.findById(req.params.vendorId, function(err, vendor) {
    vendor.remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).send('Its removed');
        }
    });
  });
});

*/


module.exports = router;
