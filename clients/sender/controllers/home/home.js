angular.module('cardcast.home', [
  'ngSanitize'
])

.controller('HomeCtrl', function ($scope, $location, Service, user, allDecks) {

  $scope.allDecks = allDecks;
  $scope.username = user;


})
