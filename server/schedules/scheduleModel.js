var mongoose = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
  lunch: String,
  dinner: String,
  night: String
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
