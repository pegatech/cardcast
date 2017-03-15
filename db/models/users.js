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

userSchema.pre('save', function(next) {
  var user = this;

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
