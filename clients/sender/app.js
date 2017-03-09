angular.module('cardcast', [
  'ngRoute'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '/sender/controllers/main.html',
      controller: 'MainCtrl'
    });
});
