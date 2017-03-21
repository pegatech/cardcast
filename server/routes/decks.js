var express = require('express');
var path = require('path');
var router = express.Router();
var deckController = require('../../db/controllers/decks.js');
var cardController = require('../../db/controllers/cards.js');
var helpers = require('../helpers');

// gets all decks from db
router.get('/', helpers.isAuth, function (req, res, next) {
  deckController.findAll(req.user._id)
    .then(function (resp) {
      res.send(resp)
    })
    .catch(function(err) {
      console.error(err);
    });
});

// adds new deck to the db
router.post('/', helpers.isAuth, function (req, res, next) {

  var deckInfo = {
    title: req.body.title,
    user: req.user._id
  }

  deckController.insertOne(deckInfo)
    .then(function (resp) {
      res.send(resp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// deletes deck and all its cards from db
router.post('/', helpers.isAuth, function (req, res, next) {
  cardController.deleteAllCards(req.user._id, req.body.deck)
    .then(function (resp) {
      res.send(resp);
    })
    .catch(function (err) {
      console.log(err);
    })
});


module.exports = router;
