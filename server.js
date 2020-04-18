


// init project
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');



// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
const mongoDB = ("mongodb+srv://"+
                 process.env.USERNAME+
                 ":"
                 +process.env.PASSWORD+
                 "@"
                 +process.env.HOST+
                 "/"
                 +process.env.DATABASE);
mongoose.connect(mongoDB, {useNewUrlParser: true, retryWrites: true});



//debugging 
mongoose.connection.on('connected', function (){
  console.log('Mongoose connected to '+process.env.DATABASE);
});

mongoose.connection.on('error', function (err){
  console.log('Mongoose connection error: '+err);
});

mongoose.connection.on('disconnected', function (){
  console.log('Mongoose disconnected.');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views/");

// Load routes
const apiRouter = require("./routes/api");
const indexRouter = require("./routes/index");



//app.use("/view/product",indexRouter);
app.use("/", indexRouter);
app.use("/api/", apiRouter);


/*tem
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
*/

//copy


// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
