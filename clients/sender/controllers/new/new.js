angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $http) {


  $scope.createCard = function() {

    var onError = function(message) {
      console.log('onError: ' + JSON.stringify(message));
    };

    var onSuccess = function(message) {
      console.log('onSuccess: ' + message);
    };

    var createCard = function(message) {
      $http.post('/', message)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(err) {
          console.error(err);
        });
    };

    sendMessage($scope.message);

  };

  $scope.changes = function() {
    $scope.show = true;
    $scope.preview = $sanitize(Markdown.compile($scope.message));
  };
});