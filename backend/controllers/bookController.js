const Book = require('../models/Book');
const fs = require("fs");

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

const addBook = async (req, res) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: req.protocol + "://" + req.get("host") + "/" + req.file.path,
    });
    book
        .save()
        .then(() => {
            res.status(201).json({ message: "Objet enregistré" });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        console.log(book);
        res.json(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateBook = async (req, res) => {
    if (req.file) {
        req.file.path = req.file.path.replace("\\", "/");
    }
    const bookObject = req.file
        ? {
            ...JSON.parse(req.body.book),
            imageUrl: req.protocol + "://" + req.get("host") + "/" + req.file.path,
        }
        : { ...req.body };
    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: "Non autorisé" });
            } else {
                Book.updateOne(
                    { _id: req.params.id },
                    { ...bookObject, _id: req.params.id }
                )
                    .then(() => res.status(200).json({ message: "Objet modifié" }))
                    .catch((error) => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

const deleteBook = async (req, res) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            console.log(req.auth.userId);
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: "Non autorisé" });
            } else {
                const filename = book.imageUrl.split("/images")[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => {
                            res.status(200).json({ message: "Objet supprimé" });
                        })
                        .catch((error) => res.status(401).json({ error }));
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

const getTopRatedBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ averageRating: -1 }).limit(3);
        res.json(books);
    } catch (error) {
        res.status(500).send(error);
    }
};

const rateBook = async (req, res) => {
    try {
        const book = await Book.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    ratings: {
                        userId: req.body.userId,
                        rating: req.body.rating,
                        grade: req.body.rating,
                    },
                },
            },
            { new: true }
        );
        const ratingLength = book.ratings.length;
        const totalRating = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
        let newAverageRating = ratingLength > 0 ? totalRating / ratingLength : 0;
        newAverageRating = parseFloat(newAverageRating.toFixed(2));

        console.log("average rating before:", book.averageRating);
        book.averageRating = newAverageRating;
        console.log("average rating after:", book.averageRating);

        await book.save();
        Book.findOne({ _id: req.params.id }).then((book) => res.status(200).json(book));

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
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
