angular.module('cardcast.main', [
  'ngSanitize'
])

.controller('MainCtrl', function($scope, $sanitize, Markdown) {

  var applicationID = DEV_APP_ID;
  var namespace = 'urn:x-cast:pegatech.card.cast';
  var session = null;

  var initialize = function() {

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
      console.log('receiverMessage: ' + namespace + ', ' + message);
    };

    var receiverListener = function(event) {
      if (event === 'available') {
        console.log('receiver found');
      } else {
        console.log('receiver list empty');
      }
    };

    var sessionListener = function(currentSession) {
      console.log('New session ID: ' + currentSession.sessionId);
      session = currentSession;
      session.addUpdateListener(sessionUpdateListener);
      session.addMessageListener(namespace, receiverMessage);
    };

    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);

    var stopApp = function() {
      session.stop(onStopAppSuccess, onError);
    };

  };

  $scope.sendMessage = function() {

    var onError = function(message) {
      console.log('onError: ' + JSON.stringify(message));
    };

    var onSuccess = function(message) {
      console.log('onSuccess: ' + message);
    };

    var sendMessage = function(message) {
      if (session !== null) {
        session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message), onError);
        $scope.message = '';
      } else {
        chrome.cast.requestSession(function(currentSession) {
          session = currentSession;
          session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message), onError);
        }, onError);
        $scope.message = '';
      }
    };

    sendMessage($scope.message);

  };

  $scope.changes = function() {
    $scope.preview = $sanitize(Markdown.compile($scope.message));
  };

  window.onload = initialize;
})
.factory('Markdown', function($interval) {

  var compile = function(text) {
    return marked(text);
  };

  return {
    compile: compile
  };
});
