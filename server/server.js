var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cardController = require('../db/controllers/cards.js');

mongoose.connect('mongodb://localhost/cardcast');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../clients/sender/index.html'));
});

app.get('/receiver', (req, res) => {
  res.sendFile(path.join(__dirname, '../clients/receiver/index.html'));
});

app.post('/deck', (req, res) => {
  cardController.findAllBy(req.body.user, function(err, resp) {
    if (err) {
      console.error(err);
    }
    res.send(resp);
  });
});

app.post('/new', (req, res) => {
  cardController.insertOne(req.body, function(err, resp) {
    if (err) {
      console.error(err);
    }
    res.send(resp);
  });
});

app.post('/edit', (req, res) => {
  cardController.updateCard(req.body.id, req.body.title, req.body.card, function(err, resp) {
    if (err) {
      console.error(err);
    }
    res.send(resp);
  });
});

app.post('/delete', (req, res) => {
  cardController.deleteCard(req.body._id, function(err, resp) {
    if (err) {
      console.error(err);
    }
    res.send(resp);
  });
});

app.use(express.static(path.join(__dirname, '../clients/')));

app.use((req, res) => {
  res.status(404).send('ERROR 404 Sorry can\'t find what you\'re looking for!');
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});
