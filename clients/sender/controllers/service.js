angular.module('cardcast.service', [])

.factory('Service', function($http, $location) {
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
        url: '/api/cards/new',
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
        method: 'POST',
        url: '/api/cards/edit',
        data: card
      });
    },

    deleteCard: function(card) {
      return $http({
        method: 'POST',
        url: '/api/cards/delete',
        data: card
      });
    }

  };
});