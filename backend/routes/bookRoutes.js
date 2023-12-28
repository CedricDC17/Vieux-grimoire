const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const { upload, convertToWebP } = require("../middlewares/multer-config");

router.get('/', auth, BookController.getAllBooks);
router.post('/', auth, upload, convertToWebP, BookController.addBook);
router.get('/:id', BookController.getBookById);
router.put('/:id/rating', BookController.rateBook);
router.put('/:id', auth, upload, convertToWebP, BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.get('/bestrating', BookController.getTopRatedBooks);

module.exports = router;
