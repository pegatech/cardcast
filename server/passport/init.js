var login = require('./login');
var signup = require('./signup');

var users = require('../../db/controllers/users');

module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    users.findUserById(id)

    .then((user) => {
      done(null, user);
    })

    .catch((err) => {
      done(err, null);
    });
  });

  login(passport);
  signup(passport);
};
