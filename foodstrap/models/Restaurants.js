var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  dba: String,
});

mongoose.model('Restaurant', RestaurantSchema);
