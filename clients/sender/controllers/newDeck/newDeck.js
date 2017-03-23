angular.module('cardcast.newDeck', [
  'ngSanitize'
])

.controller('NewDeckCtrl', function($scope, $sanitize, $location, Service) {
    // Declare message in scope
    $scope.description = '';

    // Function that creates new deck
    $scope.createDeck = function() {

      // Format the deck info to match card model schema
      var deckInfo = {
        title: $scope.title,
        description: $scope.description,
      };
      // Use the createDeck function from the Service factory
      Service.createDeck(deckInfo)
        .then(function(resp) {
          $location.path('/decks');
        });
   };
});
