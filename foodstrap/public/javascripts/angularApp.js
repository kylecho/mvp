var app = angular.module('foodstrap', ['ui.router']);
// A factory for auth
app.config(['$stateProvider', '$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: '/signin.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function ($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/signup.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function ($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
    });

// $routeProvider
//   .when('home',{
//     controller:'AuthCtrl',
//     templateUrl:'/signin.html' // The ng-template id
// });

  $urlRouterProvider.otherwise('home');
}]);

app.factory('auth', ['$http', '$window', function ($http, $window){
   var auth = {};

    auth.saveToken = function (token){
      $window.localStorage['foodstrap-token'] = token;
    };

    auth.getToken = function (){
      return $window.localStorage['foodstrap-token'];
    };

    auth.isLoggedIn = function (){
      var token = auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    auth.currentUser = function(){
      if(auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    auth.register = function(user){
      return $http.post('/signup', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    auth.logIn = function(user){
      return $http.post('/signin', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    auth.logOut = function(){
      $window.localStorage.removeItem('foodstrap-token');
    };

  return auth;
}]);

app.controller('MainCtrl', ['$scope', '$state', 'auth', function ($scope, $state, auth){
  $scope.test = 'Hello world!';
}]);

app.controller('AuthCtrl', ['$scope', '$state', 'auth', function ($scope, $state, auth){
  $scope.user = {};

  $scope.signUp = function(){
    auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.signIn = function(){
    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };
}]);
