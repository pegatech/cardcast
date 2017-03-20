// this file initializes the passport framework
var login = require('./login');
var signup = require('./signup');

var users = require('../../db/controllers/users');

module.exports = function(passport) {

  // passport needs to know where the unique id on the user model lives
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // passport needs to know how to lookup a user by ther unique id
  passport.deserializeUser((id, done) => {
    users.findUserById(id)

    .then((user) => {
      done(null, user);
    })

    .catch((err) => {
      done(err, null);
    });
  });

  // initialize the login and signup strategies
  login(passport);
  signup(passport);
};
