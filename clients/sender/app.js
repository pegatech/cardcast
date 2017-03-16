angular.module('cardcast', [
  'ngRoute',
  'cardcast.main',
  'cardcast.new',
  'cardcast.auth',
  'cardcast.service',
  'cardcast.edit'
])

.config(function($routeProvider, $httpProvider) {

  var authorize = function(Auth) {
    return Auth.isAuth();
  };

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
      controller: 'MainCtrl',
      resolve: {
        user: authorize
      }
    })
    .when('/new', {
      templateUrl: '/sender/controllers/new/new.html',
      controller: 'NewCtrl',
      resolve: {
        user: authorize
      }
    })
    .when('/edit/:id', {
      templateUrl: '/sender/controllers/edit/edit.html',
      controller: 'EditCtrl',
      resolve: {
        user: authorize
      }
    })
    .otherwise({
      redirectTo: '/cards'
    });
})


.run(function($rootScope) {
  $rootScope.$on('$viewContentLoaded', function(event, next) {
    componentHandler.upgradeAllRegistered();
  });
});
