const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');

router.get('/', auth, BookController.getAllBooks);
router.post('/', auth, BookController.addBook);
router.get('/:id', BookController.getBookById);
router.put('/:id/rating', BookController.rateBook);
router.put('/:id', auth, BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.get('/bestrating', BookController.getTopRatedBooks);

module.exports = router;
