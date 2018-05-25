// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require('path')

// Initialize Express
var app = express();
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())
app.use(express.static("./public"));
// Routes
require("./routes/html-routes.js")(app)
require("./routes/api-routes.js")(app)

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Make public a static dir

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_zz7mxmv9:5327qogkt12k954b0b8vh64fvp@ds133920.mlab.com:33920/heroku_zz7mxmv9");

var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});




// Listen on port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});