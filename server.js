// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

var bodyPraser = require('body-parser');
var urlencodedPraser = bodyPraser.urlencoded({extended: false});

app.use(bodyPraser.urlencoded({
  extended: true
}));

//load my .json file
const product_data = require('./product.json');

//use the static files in the public folder
app.use(express.static('public'));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");



//define your routes here. don't forget about error handling
app.get('/', function(request, response) {
  response.render("index", {
    message: "Hey everyone! This is my webpage.",
  });
});

app.get('/product', function(request, response, next) {
  try
  {
    response.render("product", {products: product_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/addNew', function(request, response, next) {
  try
  {
    response.render("addNew", {products: product_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/movies', function(request, response, next) {
  try
  {
    response.render("movies", {movies_key: product_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/list', function(request, response, next) {
  try
  {
    response.render("list", {
      item1:product_data,
    });
  }
  catch(err){
    next(err);
  }
});


//Create operation, you can test it in the page 
app.get('/addOne', function(request, response, next) {
  try
  {
    response.render("addNew", {products: product_data});
  }
  catch(err){
    next(err);
  }
  
});

app.post('/addOne',urlencodedPraser, function(request, response, next) {
  try
  {
    var name = JSON.stringify(request.body);
    product_data.products.push(JSON.parse(name));
    response.render("showadd", {products: product_data,
                                message: 'POST Success!!!'});
  }
  catch(err){
    next(err);
  }
  
});

//Delete operation by using HTTP get, it can show in page
app.get('/delete/:id', function(request, response, next) {
  try
  {
    var id = request.params;
    delete product_data.products[id.id-1];
    response.render("product", {products: product_data});
  }
  catch(err){
    next(err);
  }
  
});

//Delete operation by using HTTP delete, you can use Postman to test.
app.delete('/movies/:id', function(request, response, next) {
  try
  {
    var id = request.params;
    delete product_data.products[id.id-1];
    response.send(product_data);
  }
  catch(err){
    next(err);
  }
});


//Capture 404 and direct to error handling
app.use(function(request, response, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error handling in production environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    layout: false
  });
});




// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
