const mongoose = require('mongoose');

const LlibresSchema = new mongoose.Schema({
  titol: String,
  autor: String,
  anyPublicacio: Number,
  descripcio: String,
  categories: [String]
});

const Llibres = mongoose.model('Llibres', LlibresSchema, 'Llibres');

module.exports = Llibres;
