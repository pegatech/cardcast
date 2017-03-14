var LocalStrategy = require('passport-local').Strategy;
var users = require('../../db/controllers/users');

module.exports = function(passport) {

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    // unblock the event loop
    process.nextTick(function() {

      users.findUser(username)

        .then(user => {
          if (user) {
            return done(null, false);
          }

          return users.insertUser(req.body);
        })

        .then(newUser => {
          done(null, newUser);
        })

        .catch(err => {
          console.log('Signup Error: ', err);
          done(err);
        });
    });
  }));
};
