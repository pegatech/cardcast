var LocalStrategy = require('passport-local');
var users = require('../../db/controllers/users');

module.exports = function(passport) {

  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {

    users.findUser(username)

    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      return user.comparePassword(password)
        .then(match => {
          if (match) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
    })

    .catch(err => {
      console.log('Signup Error: ', err);
      done(err);
    });
  }));
};
