var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  title: String,
  card: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  db: {
    type: Schema.Types.ObjectId,
    ref: 'db'
  }
});

var CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;
