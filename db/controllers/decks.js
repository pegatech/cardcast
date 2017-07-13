var DeckModel = require('../models/decks.js');

// find all of the user's decks in the database using their id
exports.findAll = function(id) {
  return DeckModel.find({user: id});
};

// insert a new deck into the database
exports.insertOne = function(deck) {
  return DeckModel.create(deck);
};

// find a deck in the database using the card id
exports.findOne = function(id) {
  return DeckModel.findOne({_id: id});
};

// update the card info in the database
exports.updateDeck = function(deck) {
  return DeckModel.update({_id: deck.id}, {$set: {title: deck.title, description: deck.description}});
};

// delete a card from the database
exports.deleteDeck = function(id) {
  return DeckModel.remove({_id: id});
};
