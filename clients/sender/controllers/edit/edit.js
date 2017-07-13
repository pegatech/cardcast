angular.module('cardcast.edit', [
  'ngSanitize'
])

.controller('EditCtrl', function($scope, $location, $routeParams, $sanitize, Service, card) {

  // Set $scope.card with info received from card resolve
  $scope.card = card;
  $scope.deckId = Service.get();
  $scope.card.font = card.font;
  $scope.card.color = card.color;

  var checkedFont = document.querySelector("#" + $scope.card.font);
  checkedFont.setAttribute('checked', 'true');

  // set color attribute to equal selected
  $scope.setColor = function(color) {
    $scope.card.color = color;
    console.log($scope.card.color);
  };

  // set font attribute to equal selected
  $scope.setFont = function(font) {
    $scope.card.font = font;
  };

  // check if a font should be selected
  $scope.checkTrue = function(font) {
    if ($scope.card.font === font) {
      console.log(font + 'is true!');
      return true;
    } else {
      console.log(font + 'is false!');
      return false;
    }
  };

  // Function to update the card info in the database
  $scope.updateCard = function() {

    // Format the card info into an object
    var cardInfo = {
      id: $scope.card._id,
      title: $scope.card.title,
      card: $scope.card.card,
      note: $scope.card.note,
      color: $scope.card.color,
      font: $scope.card.font
    };

    // Use the updateCard function from the Service factory
    Service.updateCard(cardInfo)
      .then(function(resp) {
        console.log(cardInfo);
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
