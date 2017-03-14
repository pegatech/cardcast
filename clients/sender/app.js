angular.module('cardcast', [
  'ngRoute',
  'cardcast.main',
  'cardcast.new',
  'cardcast.auth'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: '/sender/controllers/auth/login.html',
      controller: 'AuthCtrl'
    })
    .when('/signup', {
      templateUrl: '/sender/controllers/auth/signup.html',
      controller: 'AuthCtrl'
    })
    .when('/cards', {
      templateUrl: '/sender/controllers/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/new', {
      templateUrl: '/sender/controllers/new/new.html',
      controller: 'NewCtrl'
    })
    .otherwise({
      redirectTo: '/cards'
    });
});
