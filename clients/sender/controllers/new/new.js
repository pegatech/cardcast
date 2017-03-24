angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $location, Service) {
  // Declare deckId in scope
  $scope.deckId = Service.get();
  // Declare message in scope
  $scope.message = '';
  $scope.note = '';
  $scope.color = '#B3E5FC';
  $scope.font = 'Roboto';

  $scope.setColor = function(color) {
    $scope.color = color;
  };

  $scope.setFont = function(font) {
    $scope.font = font;
  };

  // Function that creates new card
  $scope.createCard = function() {

    // Format the card info to match card model schema
    var cardInfo = {
      title: $scope.title,
      card: $scope.message,
      deck: $scope.deckId,
      note: $scope.note,
      color: $scope.color,
      font: $scope.font
    };

    // Use the createCard function from the Service factory
    Service.createCard(cardInfo)
      .then(function(resp) {
        $location.path('/decks/' + $scope.deckId);
      });

  };

  // Function that watches for changes in message
  $scope.changes = function() {

    // If message is empty show Your Card Preview
    if ($scope.message === '') {
      $scope.preview = $sanitize('<h3>Your Card Preview</h3>');
    } else {
      // Else compile the message and set it as preview
      $scope.preview = $sanitize(Service.markDownCompile($scope.message));
    }
  };

  // Function is called initially to set the preview title
  $scope.changes();

});
