// index.js
const app = require('./app');  // Importation de l'application Express

const PORT = process.env.PORT || 5000;  // Port d'écoute du serveur

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
