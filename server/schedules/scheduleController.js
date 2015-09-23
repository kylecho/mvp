var Schedule = require('./scheduleModel.js');

// request data and then pass it to router

module.exports = {
// get data from database
  allSchedules: function (req, res) {
    Schedule.find({}, function(err, schedules) { // passing {} will find all data
      if (err) return console.error(err);
      res.send(schedules); // sends back data
      console.dir(schedules);
    });
  },

// save data to database
  newSchedule: function (req, res) {
    var name = req.body.name;
    var date = Date.now();
    var lunch = req.body.lunch;
    var dinner = req.body.dinner;
    var night = req.body.night;

    var schedule = new Schedule({
      name: name,
      date: date,
      lunch: lunch,
      dinner: dinner,
      night: night
    });

    schedule.save(function (err, schedule) {
      if (err) return console.error(err);
      else console.log('Saved : ', schedule);
    });

    res.status(201).end();
  }
};
