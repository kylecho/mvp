var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var Restaurant = mongoose.model('Restaurant');
var Schedule = mongoose.model('Schedule');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST on submit "I'm ready to eat! :)"*/
// router.post('/?', function() {
  // var lunch = new Schedule(req.body);
  // var dinner = new Schedule(req.body);
  // var night = new Schedule(req.body);
  // lunch.user = req.payload.username;
//   var userid = "??";
//   var restaurantid = "??";
//   var date = Date.now();
//   var timeofday = "??";
// });

// signup
router.post('/signup', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.firstname = String;
  user.lastname = String;
  user.email = String;

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()});
  });
});

// signin
router.post('/signin', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
