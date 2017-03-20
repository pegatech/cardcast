var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },

  password: String
});

// save the password as a hash
userSchema.pre('save', function(next) {
  var user = this;

  // make sure hash happens only when password is changed/created
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

// hash the potential password and see if there is a match
// this will be a method on the model
userSchema.methods.comparePassword = function(password) {
  var user = this;

  return new Promise((fulfill, reject) => {
    bcrypt.compare(password, user.password, (err, res) => {

      if (err) {
        return reject(err);
      }

      fulfill(res);
    });
  });
};

module.exports = mongoose.model('user', userSchema);
