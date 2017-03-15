var express = require('express');
var router = express.Router();
var cardController = require('../../db/controllers/cards.js');


router.get('/', function(req, res, next) {
  cardController.findAll()
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });

});

router.post('/delete', function(req, res, next) {
  console.log('hello');
  cardController.deleteCard(req.body._id)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });

});

router.post('/new', function(req, res) {
  cardController.insertOne(req.body)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.post('/card', function(req, res) {
  cardController.findOne(req.body.id)
    .then(function(resp) {
      res.send(resp);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.post('/edit', function(req, res) {
  cardController.updateCard(req.body)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

module.exports = router;
