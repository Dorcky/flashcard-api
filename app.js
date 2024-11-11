// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importation du modèle Flashcard
const Flashcard = require('./models/Flashcard'); // Assurez-vous que ce chemin est correct

// Importation des routes
const flashcardRoutes = require('./routes/flashcards');

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser les requêtes JSON

// Connexion à la base de données MongoDB
const dbUri = process.env.MONGODB_URI;
if (!dbUri) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1); // Arrêter l'application si l'URI de la base de données est manquant
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

// Utilisation des routes
app.use('/api/flashcards', flashcardRoutes);

// Le serveur ne démarre pas ici, il sera démarré par index.js
module.exports = app;
