var express = require('express');
var router = express.Router();
var cardController = require('../../db/controllers/cards.js');
var deckController = require('../../db/controllers/decks.js');
var helpers = require('../helpers');

// gets all decks from db
router.get('/', helpers.isAuth, function (req, res, next) {
  deckController.findAll(req.user._id)
    .then(function (resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
});

// adds new deck to the db
router.post('/', helpers.isAuth, function (req, res, next) {

  var deckInfo = {
    title: req.body.title,
    description: req.body.description,
    user: req.user._id
  };

  deckController.insertOne(deckInfo)
    .then(function (resp) {
      res.send(resp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

router.get('/:id', helpers.isAuth, function (req, res, next) {
  deckController.findOne(req.params.id)
  .then(function (resp) {
    var deckInfo = resp;
    cardController.findAll(req.user._id, req.params.id)
    .then(function (resp) {
      var deck = {
        deckInfo: deckInfo,
        cards: resp
      };
      
      res.send(deck);
    })
    .catch(function (err) {
      console.log(err);
    });
  });
});

// deletes deck and all its cards from db
router.post('/:deckId', helpers.isAuth, function (req, res, next) {
  cardController.deleteAllCards(req.user._id, req.body.deck)
    .then(function (resp) {
      deckController.deleteDeck(req.body.deck)
      .then(function (resp) {
        res.send(resp);
      })
      .catch(function (err) {
        console.log(err);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

// update deck title
router.put('/:deckId', helpers.isAuth, function (req, res, next) {
  deckController.updateDeck(req.body)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
