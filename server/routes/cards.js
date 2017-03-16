var express = require('express');
var router = express.Router();
var cardController = require('../../db/controllers/cards.js');
var helpers = require('../helpers');


router.get('/', helpers.isAuth, function(req, res, next) {
  cardController.findAll()
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });

});

router.post('/', helpers.isAuth, function(req, res) {
  cardController.insertOne(req.body)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.post('/:id', helpers.isAuth, function(req, res, next) {
  cardController.deleteCard(req.body._id)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });

});


router.post('/card', helpers.isAuth, function(req, res) {
  cardController.findOne(req.body.id)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
});

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
