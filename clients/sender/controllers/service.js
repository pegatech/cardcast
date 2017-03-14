angular.module('cardcast.service', [])

.factory('Service', function($http, $location) {
  return {

    markDownCompile: function(text) {
      return marked(text);
    },

    getDeck: function() {
      console.log('getting deck');
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

    updateCard: function(id, title, card) {
      return $http({
        method: 'POST',
        url: '/api/cards/edit',
        data: {
          id: id,
          title: title,
          card: card
        }
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