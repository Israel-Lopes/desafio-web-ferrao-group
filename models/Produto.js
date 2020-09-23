const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Produto = new Schema({
  nome: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

mongoose.model('produtos', Produto);
