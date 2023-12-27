const express = require('express');
const app = express();
const cors = require('./middlewares/cors');
const Book = require('./models/book');

app.use(cors);

// Route GET pour récupérer tous les livres
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route POST pour ajouter un nouveau livre
app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route GET pour récupérer un livre spécifique par ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route PUT pour mettre à jour un livre spécifique par ID
app.put('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route DELETE pour supprimer un livre spécifique par ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;
