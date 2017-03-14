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
    //will be working on better UI for this shortly, for now it is just MVP version prompt
  var sendMessage = function(message) {

    //*********** A Session Already Exists  ***********//
    if (session !== null) {
      if(session.statusText === 'isAlreadyCasting'){

        //Give the user a chance to back out and not overwrite the card on the screen
        result = window.prompt('Someone is already casting at the moment, are you sure you want to overwrite the current card?');
        if ((result === 'y') || (result ==='Y') || (result === 'yes') || (result === 'Yes')){
          session.sendMessage(namespace, "_OVERWRITE", onSuccess.bind(this, 'Message was not sent: ' + message), onError);
          } else {
          //If user overwites, we send _OVERWRITE and toggle isAlreadyCasting to false
          //Otherwise isAlreadyCasting will stay true to prevent message recast 
            alert('overwrite canceled');
          }
        }


      session.sendMessage(namespace, message, onSuccess.bind(this, 'User canceled overwrite for the following: ' + message), onError);
      $scope.message = '';
      $scope.show = false;

      //********** A Session does not exist yet so create one ****////
      } else {
        chrome.cast.requestSession(function(currentSession) {
          session = currentSession;
          session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent: ' + message), onError);
        }, onError);
        $scope.message = '';
        $scope.show = false;
      }
    };
    var onError = function(message) {
      console.log('onError: ' + JSON.stringify(message));
    };

    var onSuccess = function(message) {
      console.log('onSuccess: ' + message);
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
