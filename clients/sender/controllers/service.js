angular.module('cardcast.service', [])

.factory('Service', function($http) {
  return {

    markDownCompile: function(text) {
      return marked(text);
    },

    getDeck: function() {
      return $http({
        method: 'GET',
        url: '/api/cards'
      })
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(err) {
          console.error(err);
        });
    },

    createCard: function(card) {
      return $http({
        method: 'POST',
        url: '/api/cards',
        data: card
      });
    },

    getCard: function(id) {
      return $http({
        method: 'POST',
        url: '/api/cards/card',
        data: {
          id: id
        }
      })
        .then(function(resp) {
          return resp.data;
        });
    },

    updateCard: function(card) {
      return $http({
        method: 'PUT',
        url: '/api/cards/' + card.id,
        data: card
      });
    },

    deleteCard: function(card) {
      return $http({
        method: 'POST',
        url: '/api/cards/' + card._id,
        data: card
      });
    }

  };
})

.factory('Auth', function($http, $location, $timeout) {
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
        $timeout(function() {
          $location.path('/login');
        });
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
