var express = require('express');
var mongoose = require('mongoose');
// load extra modules
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/demo');

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client')); // this thingy is important. Be careful with /../
var myRouter = express.Router();
app.use('/api/schedules', myRouter);
// error handlers
app.use(function (error, req, res, next) {
    console.error(error.stack);
    next(error);
  });
app.use(function (error, req, res, next) {
    res.send(500, {error: error.message});
  });
// inject schedule router into its route files
require('./schedules/scheduleRoutes.js')(myRouter);

// starts server
app.listen(8000);

module.exports = app;
