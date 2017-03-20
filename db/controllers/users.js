var UserModel = require('../models/users');

// find a user info from the database using their username
exports.findUser = function(username) {
  return UserModel.findOne({ username: username });
};

// find a user from the database using their id
exports.findUserById = function(id) {
  return UserModel.findById(id);
};

// insert a new user into the database
exports.insertUser = function(user) {
  return UserModel.create(user);
};

// update user info in the database
exports.updateUser = function(id, updates) {
  return UserModel.findByIdAndUpdate(id, updates);
};
