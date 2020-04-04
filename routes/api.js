// Route handlers
const express = require("express");
const router = express.Router();
// import data models
const Product = require("../models/product");
const Vendor = require("../models/vendor");

/*
router.get("/", function(req,res){
  Product.find({}, function (err, product_list){
    res.render("product", {products:product_list,
                        type: "Product"});
  });
});

*/

// RETREIVE all books

router.get("/product", function(req, res) {
  Product.find({}, function(err, product_list) {
    res.json(product_list);
  });
});

// RETREIVE all vendors

router.get("/vendors", function(req, res) {
  Vendor.find({}, function(err, vendor_list) {
    res.json(vendor_list);
  });
});

// RETRIEVE a specific book
router.get("/:productId", function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    res.json(product);
  });
});

//Read media by author
// Read shoes by vendors
router.get("/:venId/product", function(req, res) {
  Vendor.findById(req.params.venId, function(err, vendor) {
    Product.findById(req.params.venId, function(err, product_list) {
      if (!vendor) {
        res.status(404).send("404 Error: Page Not Found");
        return;
      } else {
        for (var m of product_list) {
          m.brand = vendor.name;
        }
        res
          .status(200)
          .render("product", { products: product_list, type: "Product" });
        console.log(vendor);
        console.log(product_list);
      }
    });
  });
});

//CREATE
router.post("/", function(req, res) {
  let product = new Product(req.body);
  product.save();
  res.status(201).send(product);
});

router.post("/product", function(req, res) {
  let product = new Product(req.body);
  product.save();
  res.status(201).send(product);
});

//CREATE vendors
router.post("/", function(req, res) {
  let vendor = new Vendor(req.body);
  vendor.save();
  res.status(201).send(vendor);
});

router.post("/vendors", function(req, res) {
  let vendor = new Vendor(req.body);
  vendor.save();
  res.status(201).send(vendor);
});

//UPDATE
router.put("/:productId", function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    product.id = req.body.id;
    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.color = req.body.color;
    product.shoeUrl = req.body.shoeUrl;
    product.save();
    res.json(product);
  });
});

//DELETE
router.delete("/:productId", function(req, res) {
  Product.findById(req.params.productId, function(err, product) {
    product.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send("removed");
      }
    });
  });
});
module.exports = router;
