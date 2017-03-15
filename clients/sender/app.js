angular.module('cardcast', [
  'ngRoute',
  'cardcast.main',
  'cardcast.new',
<<<<<<< HEAD
  'cardcast.auth',
  'cardcast.service'
=======
  'cardcast.edit',
  'LocalStorageModule'
>>>>>>> 0b05789f1d4e446089325fe928a1e99c9cbac707
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
    .when('/edit', {
      templateUrl: '/sender/controllers/edit/edit.html',
      controller: 'EditCtrl'
    })
    .otherwise({
      redirectTo: '/cards'
    });
<<<<<<< HEAD
=======
})

.factory('Markdown', function() {

  var compile = function(text) {
    return marked(text);
  };

  return {
    compile: compile
  };

>>>>>>> 0b05789f1d4e446089325fe928a1e99c9cbac707
});