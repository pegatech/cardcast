var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../clients/sender/index.html'));
});

app.get('/receiver', (req, res) => {
  res.sendFile(path.join(__dirname, '../clients/receiver/index.html'));
});

app.use(express.static(path.join(__dirname, '../clients/')));

app.use((req, res) => {
  res.status(404).send('ERROR 404 Sorry can\'t find what you\'re looking for!');
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});
