var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

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

  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(next);
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
