var LocalStrategy = require('passport-local');
var users = require('../../db/controllers/users');

module.exports = function(passport) {

  // create a login strategy using LocalStrategy
  // LocalStrategy uses the local database to do password authentication
  passport.use('login', new LocalStrategy({
    // this makes sure that the req object is passed to the function below
    passReqToCallback: true
  },
  function(req, username, password, done) {

    // the done function is how you tell passport if the strategy was successful
    // if there was an error, you pass it as the first argument: done(err, null)
    // if there was no error, but the login credentials are incorrect,
    // you pass null as the first argument and false as the second argument: done(null, false)
    // if login was successful, you pass the user object from the
    // database as the second argument: done(null, user)


    // now do your database lookup and pass the appropriate arguments to done
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
