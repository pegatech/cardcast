angular.module('cardcast.main', [
  'ngSanitize'
])


.controller('MainCtrl', function($scope, $location, $http, Service) {

  $scope.deck = {};
  $scope.currentCard = {};
  $scope.showWarning = false;

  var applicationID = DEV_APP_ID;
  var namespace = 'urn:x-cast:pegatech.card.cast';
  var session = null;
  var isCasting = false;

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
    isCasting = message === 'isCasting' ? true : false;
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

  var sessionListener = function (currentSession) {
    console.log('New session ID: ' + currentSession.sessionId);
    session = currentSession;
    session.addUpdateListener(sessionUpdateListener);
    session.addMessageListener(namespace, receiverMessage);
  };

  var initialize = function() {
    var sessionRequest = new chrome.cast.SessionRequest(applicationID);
    var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  };

  var stopApp = function() {
    session.stop(onStopAppSuccess, onError);
  };

  $scope.getDeck = function() {
    Service.getDeck()
      .then(function(resp) {
        $scope.deck = resp;
      });
  };

  $scope.showPopup = function(card) {
    if (session === null) {
      $scope.castCard(card);
    } else {
      $scope.showWarning = true;
      $scope.currentCard = card;
    }
  };

  $scope.cancelCast = function() {
    $scope.showWarning = false;
  };

  $scope.castCard = function(card) {

    var onError = function(message) {
      console.log('onError: ' + JSON.stringify(message));
    };

    var onSuccess = function(message) {
      console.log('onSuccess: ' + message);
    };

    $scope.showWarning = false;

    //*********** A Session Already Exists  ***********//
    if (session !== null) {
      if (isCasting) {

        //Give the user a chance to back out and not overwrite the card on the screen
        result = window.prompt('Someone is already casting at the moment, are you sure you want to overwrite the current card?');
        if ((result === 'y') || (result === 'Y') || (result === 'yes') || (result === 'Yes')) {
          session.sendMessage(namespace, card.card, onSuccess.bind(this, 'Message was not sent: ' + card.card), onError);
        } else {
          //If user overwites, we send _OVERWRITE and toggle isAlreadyCasting to false
          //Otherwise isAlreadyCasting will stay true to prevent message recast
          alert('overwrite canceled');
        }
      } else {
        session.sendMessage(namespace, card.card, onSuccess.bind(this, 'Message was not sent: ' + card.card), onError);
      }

    //********** A Session does not exist yet so create one ****////

    } else {

      chrome.cast.requestSession(function(currentSession) {
        session = currentSession;
        session.sendMessage(namespace, card.card, onSuccess.bind(this, 'Message sent: ' + card.card), onError);
      }, onError);
      $scope.message = '';
      $scope.show = false;
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

  $scope.sendMessage = function() {

    var onError = function(message) {
      console.log('onError: ' + JSON.stringify(message));
    };

    var onSuccess = function(message) {
      console.log('onSuccess: ' + message);
    };


    //*********** A Session Already Exists  ***********//
    if (session !== null) {
      if (session.statusText === 'isAlreadyCasting') {

        //Give the user a chance to back out and not overwrite the card on the screen
        result = window.prompt('Someone is already casting at the moment, are you sure you want to overwrite the current card?');
        if ((result === 'y') || (result === 'Y') || (result === 'yes') || (result === 'Yes')) {
          session.sendMessage(namespace, '_OVERWRITE', onSuccess.bind(this, 'Message was not sent: ' + message), onError);
        } else {
          //If user overwites, we send _OVERWRITE and toggle isAlreadyCasting to false
          //Otherwise isAlreadyCasting will stay true to prevent message recast
          alert('overwrite canceled');
        }
      }

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

  if (!chrome.cast || !chrome.cast.isAvailable) {
    setTimeout(initialize, 1000);
  }
  
  $scope.getDeck();
});
