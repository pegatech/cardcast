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
        method: 'GET',
        url: '/api/cards/' + id
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
});