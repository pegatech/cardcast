var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  title: String,
  card: String,
  user: String
});

var CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;