var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../clients/sender/index.html'));
});

router.get('/receiver', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../clients/receiver/index.html'));
});

module.exports = router;
