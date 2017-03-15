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
  cardController.deleteCard(req.body._id)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });

});

router.post('/new', function(req, res) {
  cardController.insertOne(req.body.id, req.body.title, req.body.card)
    .then(function(resp) {
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.error(err);
    });
});

module.exports = router;
