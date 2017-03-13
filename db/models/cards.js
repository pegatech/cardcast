var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
  card: String,
  username: String
});

var CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;