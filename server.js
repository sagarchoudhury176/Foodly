var http = require("http");
var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var getPrevsAndFavs = require("./routers/getPrevsAndFavs");
var orders = require("./routers/orders");
var ordersOrdersId = require("./routers/ordersOrdersId");

/* ------------------Mongoose--------------------- */

mongoose.Promise = global.Promise;

// Connect to MongoDB on localhost:27017

mongoose.connect("mongodb://localhost:27017/test", { useMongoClient: true });

/* -----------------Express------------------------ */

function customerRequestHandler(request, response) {
  response.sendFile(__dirname + "/public/customer.html");
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
app.get("/*", (req, res) => {
  res.redirect("/");
});

var log = function () {
  console.log("app listening on port 4005");
};

app.listen(process.env.PORT || 4005, log);

module.exports = app;
