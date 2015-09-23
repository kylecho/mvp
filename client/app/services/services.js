angular.module('foodstrap.services', [])

.factory('Schedules', function ($http) {
  var add = function (data) { // data comes from my form within 'ng-model'
    return $http({
      method: 'POST',
      url: 'api/schedules',
      data: data
    }).then(function (resp) {
      return resp.data;
    });
  };

  var get = function() {
    return $http({
      method: 'GET',
      url: 'api/schedules'
    }).then(function (resp) {
      return resp.data;
    });
  };

  return {
    'add': add,
    'get': get
  };
});
