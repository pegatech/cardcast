angular.module('cardcast.edit', [
  'ngSanitize'
])

.controller('EditCtrl', function($scope, $location, $routeParams, $sanitize, Service) {

  $scope.card = {};


  $scope.initialize = function() {
    var id = $routeParams.id;
    Service.getCard(id)
      .then(function(resp) {
        $scope.card = resp;
        $scope.preview = $sanitize(Service.markDownCompile(resp.card));
      });
  };

  $scope.updateCard = function() {
    var cardInfo = {
      id: $scope.card._id,
      title: $scope.card.title,
      card: $scope.card.card
    };

    Service.updateCard(cardInfo)
      .then(function(resp) {
        $location.path('/cards');
      })
      .catch(console.log);
  };

  $scope.changes = function() {
    $scope.preview = $sanitize(Service.markDownCompile($scope.card.card));
  };

  $scope.initialize();
});
