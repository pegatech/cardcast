var CardModel = require('../models/cards.js');

// find all of the user's cards in the database using their id
exports.findAll = function(id) {
  return CardModel.find({user: id});
};

// insert a new card into the database
exports.insertOne = function(card) {
  return CardModel.create(card);
};

// find a card in the database using the card id
exports.findOne = function(id) {
  return CardModel.findOne({_id: id});
};

// update the card info in the database
exports.updateCard = function(card) {
  return CardModel.update({_id: card.id}, {$set: {title: card.title, card: card.card}});
};

// delete a card from the database
exports.deleteCard = function(id) {
  return CardModel.remove({_id: id});
};
