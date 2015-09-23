angular.module('foodstrap.schedules', [])

.controller('SchedulesController', function ($scope, Schedules) {
  $scope.data = {};

  $scope.getSchedules = function(){
    Schedules.get()
      .then(function (resp) {
        $scope.data.schedules = resp;
        console.log(resp);
    });
  };
  $scope.getSchedules(); // initialize
});
