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

  var connect = function() {
    if (!window.session) {
      var applicationID = DEV_APP_ID;

      window.namespace = 'urn:x-cast:pegatech.card.cast';
      window.isCasting = false;
      window.session = null;

      var onInitSuccess = function() {
        console.log('Successful initialization');
      };

      var onError = function(message) {
        console.log('onError: ' + JSON.stringify(message));
      };

      var onSuccess = function(message) {
        console.log('onSuccess: ' + message);
      };

      var onStopAppSuccess = function() {
        console.log('Successful stop');
      };

      var sessionUpdateListener = function(isAlive) {
        var message = isAlive ? 'Session Updated' : 'Session Removed';
        message += ': ' + session.sessionId;
        console.log(message);
        if (!isAlive) {
          session = null;
        }
      };

      var receiverMessage = function(namespace, message) {
        isCasting = JSON.parse(message);
        console.log('function entered');
        console.log('receiverMessage: ' + namespace + ', ' + message);
      };

      var receiverListener = function(event) {
        if (event === 'available') {
          console.log('receiver found');
        } else {
          console.log('receiver list empty');
        }
      };

      window.sessionListener = function (currentSession) {
        console.log('New session ID: ' + currentSession.sessionId);
        session = currentSession;
        session.addUpdateListener(sessionUpdateListener);
        session.addMessageListener(namespace, receiverMessage);
      };


      var stopApp = function() {
        session.stop(onStopAppSuccess, onError);
      };


      var initialize = function() {
        if (!chrome.cast || !chrome.cast.isAvailable) {
          setTimeout(initialize, 1000);
        } else {
          var sessionRequest = new chrome.cast.SessionRequest(applicationID);
          var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

          chrome.cast.initialize(apiConfig, onInitSuccess, onError);
        }
      };

      initialize();
    }
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
        user: authorize,
        connect: connect
      }
    })
    .when('/new', {
      templateUrl: '/sender/controllers/new/new.html',
      controller: 'NewCtrl',
      resolve: {
        user: authorize,
        connect: connect
      }
    })
    .when('/edit/:id', {
      templateUrl: '/sender/controllers/edit/edit.html',
      controller: 'EditCtrl',
      resolve: {
        user: authorize,
        connect: connect
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
})

.filter('capitalize', function () {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
  };
})

.run(function($rootScope) {
  $rootScope.$on('$viewContentLoaded', function(event, next) {
    componentHandler.upgradeAllRegistered();
  });
});
