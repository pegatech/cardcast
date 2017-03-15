angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $http, $location, Service) {


  $scope.createCard = function() {

    var cardInfo = {
      title: $scope.title,
      card: $scope.message
    };

    Service.createCard(cardInfo)
      .then(function(resp) {
        $location.path('/cards');
      });

  };

  $scope.changes = function() {
    $scope.preview = $sanitize(Service.markDownCompile($scope.message));
  };

});