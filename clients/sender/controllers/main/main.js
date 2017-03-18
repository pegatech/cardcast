angular.module('cardcast.main', [])


.controller('MainCtrl', function($scope, $timeout, $location, Service, user) {

  $scope.deck = {};
  $scope.currentCard = {};
  $scope.showWarning = false;
  $scope.username = user;

  $scope.getDeck = function() {
    Service.getDeck()
      .then(function(resp) {
        $scope.deck = resp;
      });
  };

  $scope.showPopup = function(card) {
    if (session && !isCasting) {
      console.log(session.status);
      $scope.castCard(card);
    } else if (session && isCasting) {
      $scope.showWarning = true;
      $scope.currentCard = card;
    } else if (chrome.cast) {
      chrome.cast.requestSession(function(currentSession) {
        sessionListener.call(null, currentSession);
        $timeout(function() {
          if (!isCasting) {
            $scope.castCard(card);
          } else {
            $scope.showWarning = true;
            $scope.currentCard = card;
          }
        }, 100);
      }, console.log.bind(null, 'onError: '));
    }
  };

  $scope.cancelCast = function() {
    $scope.showWarning = false;
  };

  $scope.castCard = function(card) {
    $scope.showWarning = false;
    session.sendMessage(namespace, card.card, console.log.bind(null,'onSuccess: ', 'Message was sent: ' + card.card), console.log.bind(null, 'onError: '));
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

  $scope.getDeck();
});
