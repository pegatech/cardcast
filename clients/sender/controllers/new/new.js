angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $http, $location, Service) {


  $scope.createCard = function() {

    var cardInfo = {
      title: $scope.title,
      card: $scope.message,
      user: 'user'
    };

    Service.createCard(cardInfo)
      .then(function(resp) {
        $location.path('/cards');
      });

  };

  $scope.changes = function() {
<<<<<<< HEAD
    $scope.preview = $sanitize(Service.markDownCompile($scope.message));
=======
    $scope.preview = $sanitize(Markdown.compile($scope.message));
>>>>>>> 0b05789f1d4e446089325fe928a1e99c9cbac707
  };

});