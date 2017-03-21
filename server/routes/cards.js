var express = require('express');
var router = express.Router();
var cardController = require('../../db/controllers/cards.js');
var helpers = require('../helpers');

// helpers.isAuth is checking if req is authenticated

// handle get request to '/api/cards/' by using findAll function from cardController
router.get('/', helpers.isAuth, function(req, res, next) {
  // req has a user object given by passport
  cardController.findAll(req.user._id, req.body.deck)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });

});

// handle post request to '/api/cards' by using insertOne function from cardController
router.post('/', helpers.isAuth, function(req, res) {
  // add user id to the card info to specify whose card it is
  var cardInfo = {
    title: req.body.title,
    card: req.body.card,
    user: req.user._id,
    deck: req.body.deck
  };

  cardController.insertOne(cardInfo)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

// handle post request to '/api/cards/:id' by using deleteCard function from cardController
router.post('/:id', helpers.isAuth, function(req, res, next) {
  cardController.deleteCard(req.body._id)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });

});

// handle get request to '/api/cards/:id' by using findOne function from cardController
router.get('/:id', helpers.isAuth, function(req, res) {
  cardController.findOne(req.params.id)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
});

// handle put request to '/api/cards/:id' by using updateCard function from cardController
router.put('/:id', helpers.isAuth, function(req, res) {
  cardController.updateCard(req.body)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

module.exports = router;
