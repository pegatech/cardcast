angular.module('cardcast.main', [])

.controller('MainCtrl', function($scope) {

  var applicationID = DEV_APP_ID;
  var namespace = 'urn:x-cast:pegatech.card.cast';
  var session = null;

  var initialize = function() {

    var onInitSuccess = function() {

    function onInitSuccess() {
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

    var sendMessage = function(message) {
    //will be working on better UI for this shortly, for now it is just MVP version prompt
      if (session !== null) {
        if(session.statusText === 'isAlreadyCasting'){
          result = window.prompt('Someone is already casting at the moment, are you sure you want to overwrite the current card?');
          if (result === ('y' || 'Y' || 'yes' || 'Yes')){
            alert('this feature will be implemented shortly');
            //need to find a way to save the message and send something to the receiver 
            //and reset the isAlreadyCasting to false.  Then resend message.
          } else {
            alert('overwrite canceled');
          }
        }
        session.sendMessage(namespace, message, onSuccess.bind(this, 'Message was not sent: ' + message), onError);
        $scope.message = '';
        $scope.show = false;
      } else {
        chrome.cast.requestSession(function(currentSession) {
          session = currentSession;

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

