var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('User');
var Restaurant = require('Restaurant');
var Schedule = require('Schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST on submit "I'm ready to eat! :)"*/
// router.post('/?', function() {
//   var userid = "??";
//   var restaurantid = "??";
//   var date = Date.now();
//   var timeofday = "??";
// });

module.exports = router;
