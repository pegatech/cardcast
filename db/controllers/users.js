var UserModel = require('../models/users');

exports.findUser = function(username) {
  return UserModel.findOne({ username: username });
};

exports.findUserById = function(id) {
  return UserModel.findById(id);
};

exports.insertUser = function(user) {
  return UserModel.create(user);
};

exports.updateUser = function(id, updates) {
  return UserModel.findByIdAndUpdate(id, updates);
};
