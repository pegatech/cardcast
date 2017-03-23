angular.module('cardcast.edit', [
  'ngSanitize'
])

.controller('EditCtrl', function($scope, $location, $routeParams, $sanitize, Service, card) {

  // Set $scope.card with info received from card resolve
  $scope.card = card;
  $scope.deckId = Service.get();

  // Funciton to update the card info in the database
  $scope.updateCard = function() {

    // Format the card info into an object
    var cardInfo = {
      id: $scope.card._id,
      title: $scope.card.title,
      card: $scope.card.card,
      note: $scope.card.note
    };

    // Use the updateCard function from the Service factory
    Service.updateCard(cardInfo)
      .then(function(resp) {
        $location.path('/decks/' + $scope.card.deck);
      })
      .catch(console.log);
  };

  // Function that watches for changes in message
  $scope.changes = function() {

    if ($scope.card.card === '') {
      // If message is empty show Your Card Preview
      $scope.preview = $sanitize('<h3>Your Card Preview</h3>');
    } else {
      // Else compile the message and set it as preview
      $scope.preview = $sanitize(Service.markDownCompile($scope.card.card));
    }
  };

  // Function is called initially to set the preview
  $scope.changes();
});
