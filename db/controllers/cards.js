var CardModel = require('../models/cards.js');

var findAllBy = function(user, cb) {
  CardModel.find({user: user}, cb);
};

var insertOne = function(card, cb) {
  CardModel.create(card, cb);
};

var updateCard = function(title, message, cb) {
  CardModel.update({title: title}, {$set: {card: message}}, cb);
};

var deleteCard = function(title, cb) {
  CardModel.remove({title: title}, cb);
};

exports.findAllBy = findAllBy;
exports.insertOne = insertOne;