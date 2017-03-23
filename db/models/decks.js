var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deckSchema = new Schema({
  title: String,
  description: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

var DeckModel = mongoose.model('Deck', deckSchema);

module.exports = DeckModel;
