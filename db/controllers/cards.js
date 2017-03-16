var CardModel = require('../models/cards.js');

exports.findAll = function(id) {
  return CardModel.find({user: id});
};

exports.insertOne = function(card) {
  return CardModel.create(card);
};

exports.findOne = function(id) {
  return CardModel.findOne({_id: id});
};

exports.updateCard = function(card) {
  return CardModel.update({_id: card.id}, {$set: {title: card.title, card: card.card}});
};

exports.deleteCard = function(id) {
  return CardModel.remove({_id: id});
};

