angular.module('foodstrap', [
  'foodstrap.services',
  'foodstrap.main',
  'foodstrap.schedules',
  'ngRoute',
  'ngTable'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController'
    })
    .when('/schedules', {
      templateUrl: 'app/schedules/schedules.html',
      controller: 'SchedulesController'
    })
    .otherwise({
      redirectTo: '/'
    });
});
