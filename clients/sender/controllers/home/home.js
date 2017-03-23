angular.module('cardcast.home', [
  'ngSanitize'
])

.controller('HomeCtrl', function ($scope, $location, Service, user, allDecks) {

  $scope.allDecks = allDecks;
  $scope.currentDeck;
  $scope.username = user;
  $scope.showDelete = false;

  // Deletes selected card from the database
  $scope.deleteDeck = function(deck) {
    Service.deleteDeck(deck)
      .then(function(resp) {
        var index = $scope.allDecks.indexOf(deck);
        $scope.allDecks.splice(index, 1);
        $scope.showDelete = false;
      });
  };

  $scope.warnDelete = function(deck) {
    $scope.showDelete = true;
    $scope.currentDeck = deck;
  };

  $scope.cancelDelete = function() {
    $scope.showDelete = false;
  };


});
