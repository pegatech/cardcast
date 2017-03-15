var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// require routes
var clients = require('./routes/clients');
var users = require('./routes/users');
var cards = require('./routes/cards');

// make bluebird the default Promise Library
global.Promise = mongoose.Promise = require('bluebird');
//mongoose.connect('mongodb://localhost/cardcast');

// start app and connect to db
var app = express();
mongoose.connect('mongodb://localhost/cardcast');

// require middleware
var bodyParser = require('body-parser');
var morgan = require('morgan');
var expressSession = require('express-session');
var passport = require('passport');

// setup passport dependencies
app.use(expressSession({ secret: 'cardcast-secret-key'}));
app.use(passport.initialize());
app.use(passport.session());

// setup extra middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize passport
require('./passport/init')(passport);

// use routes
app.use('/', clients);
app.use('/api/users', users(passport));
app.use('/api/cards', cards);

// serve static files
app.use(express.static(path.join(__dirname, '../clients/')));

app.use((req, res, next) => {
  var err = new Error('ERROR 404 Sorry can\'t find what you\'re looking for!');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  var status = err.status || 500;
  res.status(status).send(err.message);
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000!');
});
