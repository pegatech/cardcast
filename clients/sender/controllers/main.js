angular.module('cardcast.main', [])

.controller('MainCtrl', function($scope) {
  $scope.variables = {
    applicationID: '',
    namespace: 'urn:x-cast:pegatech.card.cast',
    session: null
  }

  $scope.initialize = function() {
    var applicationID = $scope.variables.applicationID;
    var namespace = $scope.variables.namespace;
    var session = $scope.variables.session;

    if (!chrome.cast || !chrome.cast.isAvailable) {
      setTimeout(initializeCastApi, 1000);
    }

    function initializeCastApi() {
      var sessionRequest = new chrome.cast.SessionRequest(applicationID);
      var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

      chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    }

    function onInitSuccess() {
      console.log('Successful initialization');
    }

    function onError(message) {
      console.log('onError: ' + JSON.stringify(message));
    }

    function onSuccess(message) {
      console.log('onSuccess: ' + message);
    }

    function onStopAppSuccess() {
      console.log('Successful stop');
    }

    function sessionListener(currentSession) {
      console.log('New session ID: ' + currentSession.sessionId);
      $scope.variables.session = currentSession;
      session = currentSession;
      session.addUpdateListener(sessionUpdateListener);
      session.addMessageListener(namespace, receiverMessage);
    }

    function sessionUpdateListener(isAlive) {
      var message = isAlive ? 'Session Updated' : 'Session Removed';
      message += ': ' + session.sessionId;
      console.log(message);
      if (!isAlive) {
        session = null;
      }
    }

    function receiverMessage(namespace, message) {
      console.log('receiverMessage: ' + namespace + ', ' + message);
    }

    function receiverListener(event) {
      if (event === 'available') {
        console.log('receiver found');
      } else {
        console.log('receiver list empty');
      }
    }

    function stopApp() {
      session.stop(onStopAppSuccess, onError);
    }

  }

  $scope.sendMessage = function() {
    var session = $scope.variables.session;
    var applicationID = $scope.variables.applicationID;
    var namespace = $scope.variables.namespace;

    function sendMessage(message) {
      if (session !== null) {
        session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message), onError);
      } else {
        chrome.cast.requestSession(function(currentSession) {
          session = currentSession;
          session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message), onError);
        }, onError);
      }
    }

    sendMessage($scope.message);
  }

  $scope.initialize();
});
