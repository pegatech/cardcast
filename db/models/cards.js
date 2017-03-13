var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  card: String,
  user: String
});

var CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;