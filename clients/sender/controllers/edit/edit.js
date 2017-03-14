angular.module('cardcast.edit', [
  'ngSanitize'
])

.controller('EditCtrl', function($scope, $location, $http, $sanitize, localStorageService, Markdown) {

  $scope.initialize = function() {
    var card = localStorageService.get('edit');
    $scope.title = card.title;
    $scope.message = card.card;
  };

  $scope.updateCard = function() {
    var cardInfo = {
      title: $scope.title,
      card: $scope.message
    };

    $http.post('/edit', cardInfo)
      .then(function(resp) {
        $location.url('/');
      })
      .catch(function(err) {
        console.error(err);
      });
  };

  $scope.changes = function() {
    $scope.show = true;
    $scope.preview = $sanitize(Markdown.compile($scope.message));
  };

  $scope.initialize();
});