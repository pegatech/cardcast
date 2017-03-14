var CardModel = require('../models/cards.js');

var findAllBy = function(user, cb) {
  CardModel.find({user: user}, cb);
};

var insertOne = function(card, cb) {
  CardModel.create(card, cb);
};

var updateCard = function(id, title, message, cb) {
  CardModel.update({_id: id}, {$set: {title: title, card: message}}, cb);
};

var deleteCard = function(id, cb) {
  CardModel.remove({_id: id}, cb);
};

exports.findAllBy = findAllBy;
exports.insertOne = insertOne;
exports.updateCard = updateCard;
exports.deleteCard = deleteCard;