const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Product = require("../models/product");
const vendor = require("../models/vendor");
const cartSchema = new Schema({
  product_list: []
})
var my_cart;
var Cart = mongoose.model('Cart', cartSchema);
Cart.find({}, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
    } else {
      my_cart = cart_item[0];
    }
})


// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

//index
router.get("/index", function(req, res) {
  res.render("index");
});

// RETREIVE all product

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

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user
  })
);

//edit profile
router.get('/edit', forwardAuthenticated, (req, res) => res.render('edit'));


//Cart
router.post("/addCart", function(request, response) {
  let pid = request.query.id;
  Product.findOne({id: pid}, function(err, product) {
    my_cart.product_list.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      color: product.color,
      shoeUrl: product.shoeUrl
    });
    my_cart.save();
    response.status(201).send(product.name);
  })
});

router.get("/myCart", function(req, res) {
  Cart.find({}, function(err, productarray){
    let total_price = 0;
    if (productarray) {
    productarray[0].product_list.forEach(function(product) {
      total_price = total_price + product.price;
    })
    }
    res.render("cart", {
      list: productarray[0].product_list,
      total_price: total_price
    });
    //res.send(productarray);
  })
})

router.post("/clearCart", function(req, res) {
  my_cart.product_list = [];
  my_cart.save();
  res.redirect('/myCart');
})

router.post("/updateCart", function(req, res) {
  let pid = req.query.id;
  let index = 0;
  for (index = 0; index < my_cart.product_list.length; index++) {
    if (my_cart.product_list[index].id == pid) {
      my_cart.product_list.splice(index, 1);
      my_cart.save();
      break;
    }
  }
  res.redirect('/myCart');
})


module.exports = router;
