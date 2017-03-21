var DeckModel = require('../models/decks.js');

// find all of the user's decks in the database using their id
exports.findAll = function(id) {
  return DeckModel.find({user: id});
};

// insert a new deck into the database
exports.insertOne = function(deck) {
  return DeckModel.create(deck);
};

// find a deck in the database using the deck id
exports.findOne = function(id) {
  return DeckModel.findOne({_id: id});
};

// update the deck info in the database
exports.updateDeck = function(deck) {
  return DeckModel.update({_id: deck.id}, {$set: {title: deck.title}});
};

// delete a deck from the database
exports.deleteDeck = function(id) {
  return DeckModel.remove({_id: id});
};
