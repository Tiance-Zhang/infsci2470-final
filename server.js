// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
var router = express.Router();

var bodyPraser = require("body-parser");
var urlencodedPraser = bodyPraser.urlencoded({ extended: false });

app.use(
  bodyPraser.urlencoded({
    extended: true
  })
);

//load my .json file of english dictionary word
const manager = require("./manager.json");
const product = require("./product.json");

//use the static files in the public folder
app.use(express.static("public"));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");

//define your routes here. don't forget about error handling
app.get("/", function(request, response) {
  response.render("index", {
    message: "Hey everyone! This is my webpage."
  });
});

// app.post("/register", function(req, res, next) {
//   manager.findOne({ username: req.body.username }, function(err, doc) {
//     if (err) throw err;
//     if (doc) {
//       // the name already exists
//       res.json({ Failed: true, message: "the name already exists" });
//     } else {
//       manager.create(req.body, function(err, post) {
//         if (err) return next(err);
//         res.json({ Failed: false, message: "User Created !" });
//       });
//     }
//   });
// });

router.get('/register2', function(req, res, next) {
  res.render('views/register', {title: 'index'});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
