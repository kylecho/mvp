var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  timeofday: Number,
  user_id: Number,
  restaurant_id: Number
});

mongoose.model('Schedule', ScheduleSchema);
