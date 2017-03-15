var CardModel = require('../models/cards.js');

exports.findAll = function() {
  return CardModel.find({});
};

exports.insertOne = function(card) {
  return CardModel.create(card);
};

exports.updateCard = function(id, title, message) {
  return CardModel.update({_id: id}, {$set: {title: title, card: message}});
};

exports.deleteCard = function(id) {
  return CardModel.remove({_id: id});
};