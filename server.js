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
const movie_data = require('./product.json');

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
    response.render("product", {products: movie_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/movies', function(request, response, next) {
  try
  {
    response.render("movies", {movies_key: movie_data});
  }
  catch(err){
    next(err);
  }
});

app.get('/list', function(request, response, next) {
  try
  {
    //response.send("This is list endpoint");
    //response.send([movie_data, movie_info_data]);
    response.render("list", {
      item1:movie_data,
    });
  }
  catch(err){
    next(err);
  }
});

// app.get('/movies/:id', function(request, response, next) {
//   try{
    
//     for (let item of movie_data_temp.movies){
//       if (item.id === request.params.id){
//         //response.send(item);
//         response.render("movies_id", {movie: item});
//       }
//     }
//     response.status(400).send('There is no this ID');
//   }
//   catch (err) {
//     next(err);
//   }
// });


// app.get('/movies/:id/image', function(request, response, next) {
//   try{
    
//     for (let item of movie_data_temp.movies){
//       if (item.id === request.params.id){
//         //response.send(item.Images);
//         response.render("images", {movies_image: item.Images});
//       }
//     }
//     response.status(400).send('There is no this ID');
//   }
//   catch (err) {
//     next(err);
//   }
// });

// app.get('/information', function(request, response, next) {
//   try
//   {
//     response.render("information", {movies_informations: movie_info_data.informations});
//   }
//   catch(err){
//     next(err);
//   }
// });

//query parameters based id
// app.get('/search', function(request, response, next) {
//   try{
    
//     for (let item of movie_info_data.informations){
//       if (item.id === request.query.id){
//         //response.send(item);
//         response.render("search", {movies_informations: item});
//       }
//     }
//     //response.send('There is no this ID');
//   }
//   catch (err) {
//     next(err);
//   }
// });

//var add_data = '{"id": "5","Title": "Game of Thrones","Year": "2011–","Genre": "Adventure, Drama, Fantasy","Director": "N/A","Awards": "Won 1 Golden Globe. Another 185 wins & 334 nominations.","Images": ["https://images-na.ssl-images-amazon.com/images/M/MV5BNDc1MGUyNzItNWRkOC00MjM1LWJjNjMtZTZlYWIxMGRmYzVlXkEyXkFqcGdeQXVyMzU3MDEyNjk@._V1_SX1777_CR0,0,1777,999_AL_.jpg","https://images-na.ssl-images-amazon.com/images/M/MV5BZjZkN2M5ODgtMjQ2OC00ZjAxLWE1MjMtZDE0OTNmNGM0NWEwXkEyXkFqcGdeQXVyNjUxNzgwNTE@._V1_SX1777_CR0,0,1777,999_AL_.jpg","https://images-na.ssl-images-amazon.com/images/M/MV5BMDk4Y2Y1MDAtNGVmMC00ZTlhLTlmMmQtYjcyN2VkNzUzZjg2XkEyXkFqcGdeQXVyNjUxNzgwNTE@._V1_SX1777_CR0,0,1777,999_AL_.jpg","https://images-na.ssl-images-amazon.com/images/M/MV5BNjZjNWIzMzQtZWZjYy00ZTkwLWJiMTYtOWRkZDBhNWJhY2JmXkEyXkFqcGdeQXVyMjk3NTUyOTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg","https://images-na.ssl-images-amazon.com/images/M/MV5BNTMyMTRjZWEtM2UxMS00ZjU5LWIxMTYtZDA5YmJhZmRjYTc4XkEyXkFqcGdeQXVyMjk3NTUyOTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg"]}';

//Create operation, you can test it in the page 
app.get('/addOne', function(request, response, next) {
  try
  {
    response.render("addOne", {movies_key: movie_data});
  }
  catch(err){
    next(err);
  }
  
});

app.post('/addOne',urlencodedPraser, function(request, response, next) {
  try
  {
    //response.send("This is addOne endpoint");
  
    var name = JSON.stringify(request.body);
    //response.send(request.body);
    console.log(request.body);
    movie_data.movies.push(JSON.parse(name));
    // response.send(movie_data);
    //response.status(200).send('Success');
    response.render("showadd", {movies_key: movie_data,
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
    delete movie_data.products[id.id-1];
    response.render("product", {products: movie_data});
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
    delete movie_data.products[id.id-1];
    response.send(movie_data);
  }
  catch(err){
    next(err);
  }
});


//Update operation, you can use Postman to test.
//PS: Body use X-www-form-urlencoded
// app.put('/movies/:id', urlencodedPraser, function(request, response, next) {
//   try
//   {
//     for (let item of movie_data_temp.movies){
//       if (item.id === request.params.id){
//         //response.send(request.body);
//         item.Title = request.body.Title;
//         item.Year = request.body.Year;
//         item.Genre = request.body.Genre;
//         item.Director = request.body.Director;
//         item.Awards = request.body.Awards;
//         response.send(item)
//       }
//     }
    
//     response.status(400).send('There is no this ID');
//   }
//   catch(err){
//     next(err);
//   }
// });



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
