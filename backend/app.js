const express = require('express');
const Book = require('./models/book');
const authController = require('./authController');
const corsMiddleware = require('./middleware/cors'); // Middleware CORS dans un fichier séparé

const app = express();

// Middleware CORS et parsing JSON
app.use(corsMiddleware);
app.use(express.json());

// Routes pour les livres
const bookRoutes = require('./routes/bookRoutes'); // Supposant que vous avez un fichier séparé pour les routes des livres
app.use('/api/books', bookRoutes);

// Routes pour l'authentification
app.use('/api/auth', authController);

// Export app
module.exports = app;
