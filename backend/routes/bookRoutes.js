const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 

// Route GET pour récupérer tous les livres
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route POST pour ajouter un nouveau livre
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route GET pour récupérer un livre spécifique par ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route PUT pour mettre à jour un livre spécifique par ID
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route DELETE pour supprimer un livre spécifique par ID
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;