angular.module('cardcast.editDeck', [
  'ngSanitize'
])

.controller('EditDeckCtrl', function ($location, $scope, $routeParams, $sanitize, Service, deck) {

  $scope.deck = deck

  $scope.updateDeck = function () {
    var deckInfo = {
      id: $scope.deck.deckInfo_id,
      title: $scope.deck.deckInfo.title,
      description: $scope.deck.deckInfo.description
    };

    Service.updateDeck(deckInfo)
      .then(function (resp) {
        $location.path('/decks/' + resp.deckId);
      })
      .catch (function (err) {
        console.log(err);
      });
  };

  // Function that watches for changes in message
  $scope.changes = function() {

    if ($scope.deck.title === '') {
      // If message is empty show Your Card Preview
      $scope.preview = $sanitize('<h3>Your Deck</h3>');
    } else {
      // Else compile the message and set it as preview
      $scope.preview = $sanitize($scope.deck.title);
    }
  };

  // Function is called initially to set the preview
  $scope.changes();
});
