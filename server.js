var http = require("http");
var express = require("express");
const expressLayouts = require('express-ejs-layouts');//------
var app = express();
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
const passport = require('passport');//-----
var getPrevsAndFavs = require("./routers/getPrevsAndFavs");
var orders = require("./routers/orders");
var ordersOrdersId = require("./routers/ordersOrdersId");
const flash = require('connect-flash');//-----
const session = require('express-session');//----

/* ------------------Mongoose--------------------- */

mongoose.Promise = global.Promise;

// Connect to MongoDB on localhost:27017

mongoose.connect("mongodb://localhost:27017/test", { useMongoClient: true });

//-----------------passport--------------------------
// Passport Config
require('./config/passport')(passport);


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


app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/reg', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


/* -----------------Express------------------------ */

function customerRequestHandler(request, response) {
  response.sendFile(__dirname + "/public/customer.html");
}

function loginRequestHandler(request, response) {
  response.sendFile(__dirname + "/public/login.html");
}

function BARequestHandler(request, response) {
  response.sendFile(__dirname + "/public/business-admin.html");
}

app.use(express.static(__dirname + "/public"));

app.use("/api", getPrevsAndFavs);
app.use("/api", orders);
app.use("/api", ordersOrdersId);

app.get("/admin", BARequestHandler);
app.get("/", customerRequestHandler);
app.get("/login", loginRequestHandler);

app.get("/*", (req, res) => {
  res.redirect("/");
});

var log = function () {
  console.log("app listening on port 4005");
};

app.listen(process.env.PORT || 4005, log);

module.exports = app;
