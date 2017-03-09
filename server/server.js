var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/card', function(req, res) {
  res.sendFile("Sender html");
});

app.post('/card', function(req, res) {
  var texts = req.body.texts;

});

app.get('/receiver', function(req, res) {
  res.sendFile("Receiver html");
});

app.use(function(req, res) {
  res.status(404).send("Sorry can't find what you're looking for!");
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});