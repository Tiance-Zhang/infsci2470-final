const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Product = require("../models/product");
const Cart = require("../models/cart");
var my_cart;
var my_product;
var total_cart;
var bool = 0;

// Welcome Page
// router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

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

// RETREIVE all  product for admin

router.get("/productadmin", function(request, response) {
  Product.find({}, function(err, product_list) {
    response.render("productadmin", {
      product: product_list
    });
  });
});

// RETREIVE all  product for admin
router.get("/admin", function(request, response) {
  Cart.find({}, function(err, cart_list) {
    response.render("admin", {
      cart: cart_list
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
router.get("/edit", function(req, res) {
  res.render("edit");
});

//View Profile
router.get("/mine", ensureAuthenticated, (req, res) =>
  res.render("mine", {
    user: req.user
  })
);
//View Instruction
router.get("/instructions", ensureAuthenticated, (req, res) =>
  res.render("instructions", {
    user: req.user
  })
);

//Cart
router.post("/addCart", function(request, response) {
  Cart.find({ email: request.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = request.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  let pid = request.query.id;
  Product.findOne({ Task_id: pid }, function(err, product) {
    my_cart.product_list.push({
      Task_id: product.id,
      TaskName: product.TaskName,
      Abstract: product.Abstract,
      isred: product.isred,
      status: product.status,
      Room: product.Room,
      Description: product.Description
    });
    //my_cart.save();
    my_cart.save(function(err, user) {
      if (err) {
        console.log(err);
        response.send(400, "Bad Request");
      } else {
        response.redirect("/product");
      }
    });
  });
});

router.get("/myCart", function(req, res) {
  Cart.find({ email: req.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = req.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });
  Cart.find({ email: req.user.email }, function(err, productarray) {
    let total_price = 0;
    if (productarray.length > 0) {
      productarray[0].product_list.forEach(function(product) {
        total_price = total_price + product.price;
      });
      res.render("cart", {
        list: productarray[0].product_list,
        total_price: total_price
      });
    } else {
      res.render("cart", {
        list: [],
        total_price: total_price
      });
    }

    //res.send(productarray);
  });
});



//update
router.put("/update", async function(req, res) {
  var pid = req.query.Task_id;
  Cart.find({ email: req.user.email }, function(err, cart_item) {
    if (!cart_item.length) {
      my_cart = new Cart();
      my_cart.email = req.user.email;
      my_cart.save();
    } else {
      my_cart = cart_item[0];
    }
  });

  let index = 0;
  var idx = null;
  for (index = 0; index < my_cart.product_list.length; index++) {
    if (my_cart.product_list[index].Task_id == pid) {
      idx = parseInt(my_cart.product_list[index].status);
      break;
    }
  }
  console.log(idx);

  switch (idx) {
    case 1:
      await Cart.updateOne(
        {  $and: [ {email: req.user.email} , {'product_list.Task_id': pid.toString()}]},{"product_list.$.status": 3});
      break;
    case 2:
      await Cart.updateOne(
        { email: req.user.email, "product_list.Task_id": pid },
        { "product_list.$.status": 1 }
      );
      break;
    case 3:
      await Cart.updateOne(
        { email: req.user.email, "product_list.Task_id": pid },
        { "product_list.$.status": 2 }
      );
      break;
    case "1":
      await Cart.updateOne(
        { email: req.user.email, "product_list.Task_id": pid},
        { "product_list.$.status": 3 }
      );
      break;
    case "2":
      await Cart.updateOne(
        { email: req.user.email, "product_list.Task_id": pid },
        { "product_list.$.status": 1 }
      );
      break;
    case "3":
      await Cart.updateOne(
        { email: req.user.email, "product_list.Task_id": pid },
        { "product_list.$.status": 2 }
      );
      break;
  }
  
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

//add one
router.post("/addone", async function(req, res) {
  bool = 0;
  Cart.find({}, function(err, cart_item) {
    total_cart = cart_item;
    console.log(3);
  });

  let pid = req.body.TaskID;
  let product = new Product(req.body);
  product.Task_id = pid;
  console.log(Product);
  Product.find({}, function(err, product_lst) {
    my_product = product_lst;
    console.log(2);
    var index = 0;

    for (index = 0; index < my_product.length; index++) {
      if (my_product[index].Task_id == String(pid)) {
        bool = 1;
        console.log("catched");
        break;
      }
    }
    console.log("now" + bool);
    if (bool == 0) {
      let product = new Product(req.body);
      product.Task_id = pid;
      product.save();
      console.log("saved");
      //------------------------------------------------
      Product.findOne({ Task_id: pid }, function(err, product) {
        console.log(4);
        var index = 0;
        for (index = 0; index < total_cart.length; index++) {
          my_cart = total_cart[index];
          my_cart.product_list.push({
            Task_id: req.body.TaskID,
            TaskName: req.body.TaskName,
            Abstract: req.body.Abstract,
            isred: req.body.isred,
            status: req.body.status,
            Room: req.body.Room,
            Description: req.body.Description
          });

          //my_cart.save();
          my_cart.save(function(err, user) {
            if (err) {
              console.log(err);
              res.send(400, "Bad Request");
            }
          });
        }
      });
      //------------------------------------------------
    }
  });

  res.redirect("/productadmin");
});

//delete
router.put("/delete", function(req, res) {
  let pid = req.query.Task_id;
  Cart.find({}, function(err, cart_item) {
    console.log("1");
    total_cart = cart_item;
  });
  console.log("");
  Product.findOne({ Task_id: pid }, function(err, product) {
    let total = 0;
    let index = 0;
    console.log("2");
    for (total = 0; total < total_cart.length; total++) {
      my_cart = total_cart[total];
      for (index = 0; index < my_cart.product_list.length; index++) {
        if (my_cart.product_list[index].Task_id == pid) {
          my_cart.product_list.splice(index, 1);
          try {
            my_cart.save();
          } catch (err) {}
          break;
        }
      }
    }
  });
  Product.findOne({ Task_id: pid }, function(err, product) {
    product.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

  res.redirect("/productadmin");
});

module.exports = router;
