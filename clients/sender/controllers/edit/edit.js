angular.module('cardcast.edit', [
  'ngSanitize'
])

.controller('EditCtrl', function($scope, $location, $routeParams, $sanitize, Service) {

  $scope.card = {};

  // Function to get the card info from the database
  $scope.initialize = function() {

    // Grabbing the id from route params
    var id = $routeParams.id;

    // Use the getCard function from the Service factory
    Service.getCard(id)
      .then(function(resp) {
        $scope.card = resp;
        $scope.preview = $sanitize(Service.markDownCompile(resp.card));
      });

  };

  // Funciton to update the card info in the database
  $scope.updateCard = function() {

    // Format the card info into an object
    var cardInfo = {
      id: $scope.card._id,
      title: $scope.card.title,
      card: $scope.card.card
    };

    // Use the updateCard function from the Service factory
    Service.updateCard(cardInfo)
      .then(function(resp) {
        $location.path('/cards');
      })
      .catch(console.log);
  };

  // Function that watches for changes in message
  $scope.changes = function() {
    $scope.preview = $sanitize(Service.markDownCompile($scope.card.card));
  };

  // Call the initialize function to get the card info when the page loads
  $scope.initialize();
});
