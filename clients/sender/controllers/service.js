angular.module('cardcast.service', [])

.factory('Service', function($http) {
  return {

    // Function to compile markdown
    markDownCompile: function(text) {
      return marked(text);
    },

    // Function that makes get request to '/api/cards' to get user's deck from db
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

    // Function that makes post request to '/api/cards' to insert new card into db
    createCard: function(card) {
      return $http({
        method: 'POST',
        url: '/api/cards',
        data: card
      });
    },

    // Function that makes get request to '/api/cards/:id' to get a single card info from db
    getCard: function(id) {
      return $http({
        method: 'GET',
        url: '/api/cards/' + id
      })
        .then(function(resp) {
          return resp.data;
        });
    },

    // Function that makes put request to '/api/cards/:id' to update the card info in the db
    updateCard: function(card) {
      return $http({
        method: 'PUT',
        url: '/api/cards/' + card.id,
        data: card
      });
    },

    // Function that makes post request to '/api/cards/:id' to delete the card from the db
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

    // check if user is logged in
    // used for route authentication in app.js
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

    // login to the server
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

    // create new account on the server
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

    // logout on the server and redirect to login page
    logout: function() {
      return $http({
        method: 'POST',
        url: '/api/users/logout'
      })
      .then(function() {
        $timeout(function() {
          endSession();
          $location.path('/login');
        });
      })
      .catch(function() {
        $timeout(function() {
          endSession();
          $location.path('/login');
        });
      });
    }
  };
});
