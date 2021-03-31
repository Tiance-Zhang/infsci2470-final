const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Product = require("../models/product");
const Cart = require("../models/cart");
var my_cart;
var my_product;

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
  Product.findOne({ id: pid }, function(err, product) {
    my_cart.product_list.push({
      id: product.id,
      TaskName: product.TaskName,
      Instructor: product.Instructor,
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

// router.post("/clearCart", function(req, res) {
//   Cart.find({ email: req.user.email }, function(err, cart_item) {
//     if (!cart_item.length) {
//       my_cart = new Cart();
//       my_cart.email = req.user.email;
//       my_cart.save();
//     } else {
//       my_cart = cart_item[0];
//     }
//   });
//   my_cart.product_list = [];
//   my_cart.save();
//   res.redirect("/myCart");
// });

// // test
// router.put("/update", function(req, res) {
//   Cart.find({email: req.user.email}, function(err, cart_item) {
//     if (!cart_item.length) {
//       my_cart = new Cart();
//       my_cart.email = req.user.email;
//       my_cart.save();
//     } else {
//       my_cart = cart_item[0];
//     }
//   })

//   let pid = req.query.id;
//   let index = 0;
//   for (index = 0; index < my_cart.product_list.length; index++) {
//     if (my_cart.product_list[index].id == pid) {
//       console.log('catched!')
//       my_product = new Product();
//       my_product.id = pid;
//       my_product.status = 2;
//       console.log(my_product)
//       my_product.save();
//       break;
//     }
//   }
//   console.log('good')
// //   Cart.findOne({id: change},function(err,uu){
// //     console.log(uu)

// //   })

//   res.redirect("/mycart");
// })



//update
router.put("/update", function(req, res) {
  // Cart.findOne({ email: req.user.email, 'product_list.TaskName':"333"}, function(err, product_list) {
  //   console.log('good');
  //   console.log(product_list.TaskName);
  //   product_list.status = 200;
  // });
  
  const doc = Cart.create({
  email: req.user.email,
  'product_list.TaskName':"333",
    'product_list.status':1
});

// Update the document by setting a property and calling `save()`
doc.product_list.TaskName = "3333";
doc.save();
//     let pid = req.query.id;
//     let index = 0;
//     console.log(my_cart.product_list);
//     my_cart.product_list[0].status = 123456789;
//     my_cart.save();
  
//   Cart.updateOne({"id":pid},{$set:{"":20 }},function(error,data){
//         if(error){
//             console.log('修改数据失败');
//             return;
//         }
//         //console.log(data);
//         console.log("修改数据成功");

    
//     for (index = 0; index < my_cart.product_list.length; index++) {
//       console.log(my_cart.product_list[index].id);
//       console.log(pid);
//       if (my_cart.product_list[index].id == pid) {
//         my_cart.product_list[index].status = 123456789
//         my_cart.save();
//         console.log(my_cart.product_list[index]);        
//         break;
//       }
//     }
     res.redirect("/mycart");
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

  res.redirect("/productadmin");
});

//DELETE
router.post("/delete", function(req, res) {
  Product.findOne({ id: req.query.id }, function(err, product) {
    product.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        //res.status(204).send("removed");
        res.redirect("/productadmin");
      }
    });
  });
});

module.exports = router;
