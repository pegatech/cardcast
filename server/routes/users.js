var express = require('express');
var router = express.Router();

var helpers = require('../helpers');

// notice how module.exports is a function that accepts passport as an argument
// the passport object cannot just be required and used in this file. It must use
// the initialized passport object that was created in server/server.js.
// usually a router is what you would expect to be exported from this file,
// so make sure that you return the router at the bottom of this function
module.exports = function(passport) {

  // handle get request to '/api/users' to see if there is an active session
  // if the user is logged in, the username will be sent back in the response
  // helpers.isAuth will handle the response for not-logged-in
  router.get('/', helpers.isAuth, function(req, res, next) {
    res.json(req.user.username);
  });

  // login with the passport strategy defined in server/passport/login.js
  router.post(
    '/login',
    passport.authenticate('login'),
    function(req, res, next) {
      console.log(req.user.username);
      res.sendStatus(200);
    }
  );

  // signup with the passport strategy defined in server/passport/signup.js
  router.post(
    '/signup',
    passport.authenticate('signup'),
    function(req, res, next) {
      res.sendStatus(201);
    }
  );

  // logout with the logout method on the req object available from passport
  router.post('/logout', function(req, res, next) {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
