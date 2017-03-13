angular.module('cardcast.new', [
  'ngSanitize'
])

.controller('NewCtrl', function($scope, $sanitize, $http, Markdown) {


  $scope.createCard = function() {

    var cardInfo = {
      title: $scope.title,
      card: $scope.message,
      user: 'user'
    };

    var createCard = function(card) {

      $http.post('/', card)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(err) {
          console.error(err);
        });
    };

    createCard(cardInfo);

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