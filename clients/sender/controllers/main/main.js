angular.module('cardcast.main', [])

.controller('MainCtrl', function($scope) {

  var applicationID = DEV_APP_ID;
  var namespace = 'urn:x-cast:pegatech.card.cast';
  var session = null;

  var initialize = function() {

<<<<<<< HEAD:clients/sender/controllers/main/main.js
    var onInitSuccess = function() {
=======
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener, receiverMessage);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);


    function onInitSuccess() {
>>>>>>> Implement receiver logic to set state to isAlreadyCasting when applicable:clients/sender/controllers/main.js
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

<<<<<<< HEAD:clients/sender/controllers/main/main.js
    var receiverMessage = function(namespace, message) {
=======
    function receiverMessage(namespace, message) {
      alert('hello');
>>>>>>> Implement receiver logic to set state to isAlreadyCasting when applicable:clients/sender/controllers/main.js
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
        session.sendMessage(namespace, message, onSuccess.bind(this, 'Message not sent: ' + message), onError);
        $scope.message = '';
<<<<<<< HEAD:clients/sender/controllers/main/main.js
        $scope.show = false;
=======
        console.log("already Has session", session.statusText);
>>>>>>> Implement receiver logic to set state to isAlreadyCasting when applicable:clients/sender/controllers/main.js
      } else {
        chrome.cast.requestSession(function(currentSession) {
          session = currentSession;
          console.log(session);
          session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message), onError);
        }, onError);
        $scope.message = '';
        $scope.show = false;
      }
    };

    sendMessage($scope.message);

  };

  window.onload = initialize;
});

