const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getTopRatedBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ rating: -1 }).limit(3);
        res.json(books);
        console.log(books);
        console.log(res.json(books));
    } catch (error) {
        res.status(500).send(error);
    }
};

const rateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { userId, rating } = req.body; 

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 0 and 5.' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        const existingRating = book.ratings.find(r => r.userId === userId);
        if (existingRating) {
            return res.status(400).json({ message: 'User has already rated this book.' });
        }

        book.ratings.push({ userId, rating });
        book.averageRating = book.ratings.reduce((acc, curr) => acc + curr.rating, 0) / book.ratings.length;

        await book.save();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getAllBooks,
    addBook,
    getBookById,
    updateBook,
    deleteBook,
    getTopRatedBooks,
    rateBook,
};
