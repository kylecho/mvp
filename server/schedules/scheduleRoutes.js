var scheduleController = require('./scheduleController.js');

// take the data and send it to client
module.exports = function (app) {
  app.route('/')
    .get(scheduleController.allSchedules)
    .post(scheduleController.newSchedule);
};
