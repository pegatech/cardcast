angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $http, Markdown) {


  $scope.createCard = function() {

    var createCard = function(message) {

      $http.post('/', message)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(err) {
          console.error(err);
        });
    };

    createCard($scope.message);

  };

  $scope.changes = function() {
    $scope.show = true;
    $scope.preview = $sanitize(Markdown.compile($scope.message));
  };
})
.factory('Markdown', function($interval) {

  var compile = function(text) {
    return marked(text);
  };

  return {
    compile: compile
  };
});