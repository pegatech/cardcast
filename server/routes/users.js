var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  router.post(
    '/login',
    passport.authenticate('login'),
    function(req, res, next) {
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

  return router;
};
