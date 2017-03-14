var express = require('express');
var router = express.Router();

var helpers = require('../helpers');

module.exports = function(passport) {

  router.get('/', helpers.isAuth, function(req, res, next) {
    res.json(req.user.username);
  });

  router.post(
    '/login',
    passport.authenticate('login'),
    function(req, res, next) {
      console.log(req.user.username);
      res.sendStatus(200);
    }
  );

  router.post(
    '/signup',
    passport.authenticate('signup'),
    function(req, res, next) {
      res.sendStatus(201);
    }
  );

  router.post('/logout', function(req, res, next) {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
