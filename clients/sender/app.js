angular.module('cardcast', [
  'ngRoute',
  'cardcast.main',
  'cardcast.new'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/sender/controllers/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/new', {
      templateUrl: '/sender/controllers/new/new.html',
      controller: 'NewCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
