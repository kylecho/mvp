angular.module('foodstrap.main', [])

.controller('MainController', function ($scope, $location, Schedules) {
  $scope.data = $scope.data || {}; // this is my data from view

  $scope.addSchedules = function(){
    Schedules.add($scope.data)
      .then(function() {
        console.log('beep boop');
        $location.url('/schedules');
    });
  };
});
