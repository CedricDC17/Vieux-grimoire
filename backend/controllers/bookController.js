const Book = require('../models/Book');

exports.getBooks = (req, res, next) => {
    async (req, res) => {
        try {
            const books = await Book.find();
            res.json(books);
        } catch (error) {
            res.status(500).send(error);
        }
    }}
