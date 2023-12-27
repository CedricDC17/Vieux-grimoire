const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const cors = require('./middlewares/cors');
const Book = require('./models/book');

app.use(cors);

// Ajouter un livre
app.post('/books', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
        ...req.body
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

// Récupérer un livre spécifique
app.get('/api/books/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
});

// Récupérer tous les livres
app.use('/api/books', bookRoutes);


module.exports = app;
