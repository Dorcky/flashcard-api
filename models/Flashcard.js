// models/Flashcard.js
const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    Francais: {
        type: String,
        required: true,
    },
    Anglais: {
        type: String,
        required: true,
    },
});

// Spécifier le nom de la collection ici
const Flashcard = mongoose.model('Flashcard', flashcardSchema, 'Pepa Pig1');

module.exports = Flashcard;
