// routes/flashcards.js

const express = require('express');
const Flashcard = require('../models/Flashcard');
const router = express.Router();

// Récupérer toutes les flashcards (GET)
router.get('/', async (req, res) => {
  try {
    // Recherche dans la collection "Flashcard"
    const flashcards = await Flashcard.find();
    console.log("Flashcards récupérées :", flashcards);  // Afficher les résultats dans la console pour débogage
    res.status(200).json(flashcards);
  } catch (err) {
    console.error("Erreur de récupération :", err);  // Log d'erreur
    res.status(500).json({ message: err.message });
  }
});

// Ajouter une nouvelle flashcard (POST)
router.post('/', async (req, res) => {
  const { Francais, Anglais } = req.body;

  // Vérification si les champs sont présents
  if (!Francais || !Anglais) {
    return res.status(400).json({ message: "Les champs 'Francais' et 'Anglais' sont obligatoires." });
  }

  try {
    // Création d'une nouvelle flashcard
    const flashcard = new Flashcard({
      Francais,
      Anglais,
    });

    const savedFlashcard = await flashcard.save();
    console.log("Flashcard ajoutée :", savedFlashcard);  // Afficher la flashcard ajoutée dans la console pour débogage
    res.status(201).json(savedFlashcard);
  } catch (err) {
    console.error("Erreur d'ajout :", err);  // Log d'erreur
    res.status(400).json({ message: err.message });
  }
});

// Mettre à jour une flashcard existante (PUT)
router.put('/:id', async (req, res) => {
  const { Francais, Anglais } = req.body;

  // Vérification si les champs sont présents
  if (!Francais || !Anglais) {
    return res.status(400).json({ message: "Les champs 'Francais' et 'Anglais' sont obligatoires." });
  }

  try {
    // Mise à jour de la flashcard
    const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, { Francais, Anglais }, { new: true });
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard non trouvée." });
    }
    console.log("Flashcard mise à jour :", flashcard);  // Afficher la flashcard mise à jour dans la console pour débogage
    res.status(200).json(flashcard);
  } catch (err) {
    console.error("Erreur de mise à jour :", err);  // Log d'erreur
    res.status(400).json({ message: err.message });
  }
});

// Supprimer une flashcard (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    // Suppression de la flashcard par ID
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard non trouvée." });
    }
    console.log("Flashcard supprimée :", flashcard);  // Afficher la flashcard supprimée dans la console pour débogage
    res.status(200).json({ message: "Flashcard supprimée." });
  } catch (err) {
    console.error("Erreur de suppression :", err);  // Log d'erreur
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
