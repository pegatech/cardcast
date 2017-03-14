angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $http, $location, Markdown) {


  $scope.createCard = function() {

    var cardInfo = {
      title: $scope.title,
      card: $scope.message,
      user: 'user'
    };

    var createCard = function(card) {
      $http.post('/new', card)
        .then(function(resp) {
          console.log('Successfully Created!');
          $location.url('/');
        })
        .catch(function(err) {
          console.error(err);
        });
    };

    createCard(cardInfo);

  };

  $scope.changes = function() {
    $scope.preview = $sanitize(Markdown.compile($scope.message));
  };

});