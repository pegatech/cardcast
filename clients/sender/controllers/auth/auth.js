angular.module('cardcast.auth', [])

.controller('AuthCtrl', function($scope, $location, $timeout, Auth) {

  $scope.username = '';
  $scope.password = '';
  $scope.check = '';
  $scope.warning = '';

  $scope.login = function() {
    if ($scope.username && $scope.password) {

      $scope.warning = '';

      Auth.login($scope.username, $scope.password)
        .then(function() {
          $location.path('/cards');
        })
        .catch(function() {
          $scope.warning = 'Invalid username or password.';
        });

    } else {
      $scope.warning = 'Please enter your credentials.';
    }
  };

  $scope.signup = function() {
    var username = $scope.username;
    var password = $scope.password;
    var check = $scope.passCheck;

    $scope.warning = '';

    if (username && username.length < 8) {
      $scope.warning = 'Username must be at least 8 characters long';
    } else if (password && password.length < 8) {
      $scope.warning = 'Password must be at least 8 characters long';
    } else if (password && check && password !== check) {
      $scope.warning = 'Passwords do not match';
    } else if (username && password) {

      Auth.signup({username: username, password: password})
        .then(function() {
          $location.path('/cards');
        })
        .catch(function() {
          $scope.warning = 'User already exists.';
        });
    } else {
      $scope.warning = 'Please complete form.';
    }
  };
});
