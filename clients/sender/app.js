angular.module('cardcast', [
  'ngRoute',
  'cardcast.main'
])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/sender/controllers/main.html',
      controller: 'MainCtrl'
    });
});
