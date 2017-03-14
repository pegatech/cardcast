angular.module('cardcast', [
  'ngRoute',
  'cardcast.main',
  'cardcast.new',
  'cardcast.edit',
  'LocalStorageModule'
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
    .when('/edit', {
      templateUrl: '/sender/controllers/edit/edit.html',
      controller: 'EditCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})

.factory('Markdown', function() {

  var compile = function(text) {
    return marked(text);
  };

  return {
    compile: compile
  };

});