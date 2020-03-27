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
const shoes_data = require('./shoes.json');

const vendor_data = require('./vendor.json');

//use the static files in the public folder
app.use(express.static('public'));

//tell express where to get your views and which template engine to use
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");



//define your routes here. don't forget about error handling

// Five routes for rendering view pages
app.get('/', function(request, response) {
  response.render("index", {
    message: "Hey everyone! This is my webpage.",
  });
});



app.get('/product2', function(request, response, next) {
  try
  {
    response.render("product2", {foot: shoes_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/addNew', function(request, response, next) {
  try
  {
    response.render("addNew", {foot: shoes_data});
  }
  catch(err){
    next(err);
  }
});



app.get('/vendors', function(request, response, next) {
  try
  {
    response.render("vendors", {vendors: vendor_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/addOne', function(request, response, next) {
  try
  {
    response.render("addNew", {foot: shoes_data});
  }
  catch(err){
    next(err);
  }
});




// APIs for functions
app.post('/addOne',urlencodedPraser, function(request, response, next) {
  try
  {
    var name = JSON.stringify(request.body);
    shoes_data.shoes.push(JSON.parse(name));
    response.render("added", {foot: shoes_data,
                                message: 'POST Success!!!'});
  }
  catch(err){
    next(err);
  }
  
});

//Delete shoes
app.get('/delete/:id', function(request, response, next) {
  try
  {
    var id = request.params;
    delete shoes_data.shoes[id.id-1];
    response.render("product2", {foot: shoes_data});
  }
  catch(err){
    next(err);
  }
  
});




//Delete operation by using HTTP delete, you can use Postman to test.
app.get('/deleteVendor/:id/vendor', function(request, response, next) {
  try
  {
    var id = request.params;
    delete vendor_data.vendors[id.id-1];
    response.render("vendors", {vendors: vendor_data});
  }
  catch(err){
    next(err);
  }
  
});






// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
