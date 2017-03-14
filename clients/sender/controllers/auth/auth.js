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
})

// add this to the servcies file after pull request
.factory('Auth', function($http, $location) {
  return {

    isAuth: function() {
      return $http({
        method: 'GET',
        url: '/api/users'
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function() {
        $location('/login');
      });
    },

    login: function(username, password) {
      return $http({
        method: 'POST',
        url: '/api/users/login',
        data: {
          username: username,
          password: password
        }
      });
    },

    signup: function(user) {
      return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function(res) {
        return res.data;
      });
    },

    logout: function() {
      return $http({
        method: 'POST',
        url: '/api/users/logout'
      })
      .then(function() {
        $location.path('/login');
      })
      .catch(function() {
        $location.path('/login');
      });
    }
  };
});
