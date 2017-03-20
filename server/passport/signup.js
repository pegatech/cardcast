var LocalStrategy = require('passport-local').Strategy;
var users = require('../../db/controllers/users');

// create a signup strategy using LocalStrategy
// LocalStrategy uses the local database to do password authentication
module.exports = function(passport) {

  passport.use('signup', new LocalStrategy({
    // this makes sure that the req object is passed to the function below
    passReqToCallback: true
  },
  function(req, username, password, done) {

    // unblock the event loop
    // i don't know why you need this, but you do so just do it
    process.nextTick(function() {

      // the done function is how you tell passport if the strategy was successful
      // if there was an error, you pass it as the first argument: done(err, null)
      // if there was no error, but the signup credentials are incorrect,
      // you pass null as the first argument and false as the second argument: done(null, false)
      // if signup was successful, you pass the user object from the
      // database as the second argument: done(null, user)

      // now do your database lookup and pass the appropriate arguments to done
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
