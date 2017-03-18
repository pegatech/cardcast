angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $location, Service) {

  $scope.message = '';

  $scope.createCard = function() {

    var cardInfo = {
      title: $scope.title,
      card: $scope.message,
    };

    Service.createCard(cardInfo)
      .then(function(resp) {
        $location.path('/cards');
      });

  };

  $scope.changes = function() {
    if ($scope.message === '') {
      $scope.preview = $sanitize('<h1>Your Card Preview</h1>');
    } else {
      $scope.preview = $sanitize(Service.markDownCompile($scope.message));
    }
  };

  $scope.changes();

});
