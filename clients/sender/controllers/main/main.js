angular.module('cardcast.main', [])

.controller('MainCtrl', function($scope, $location, $http, Service) {

  $scope.deck = {};

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

  $scope.getDeck = function() {
    Service.getDeck()
      .then(function(resp) {
        $scope.deck = resp;
      });
  };

  $scope.castCard = function(card) {

    var onError = function(message) {
      console.log('onError: ' + JSON.stringify(message));
    };

    var onSuccess = function(message) {
      console.log('onSuccess: ' + message);
    };

    if (session !== null) {
      console.log('1st');
      session.sendMessage(namespace, card.card, onSuccess.bind(this, 'Message sent: ' + card.card), onError);
    } else {
      console.log('2nd');
      chrome.cast.requestSession(function(currentSession) {
        session = currentSession;
        session.sendMessage(namespace, card.card, onSuccess.bind(this, 'Message sent: ' + card.card), onError);
      }, onError);
    }

  };

  $scope.deleteCard = function(card) {
    if (confirm('Are you sure you want to delete the ' + card.title + ' Card?')) {
      Service.deleteCard(card)
        .then(function(resp) {
          Service.getDeck()
            .then(function(resp) {
              $scope.deck = resp;
            });
        });
    }
  };

  window.onload = initialize;
  $scope.getDeck();
});

