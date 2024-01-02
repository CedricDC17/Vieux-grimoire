const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const { upload, convertToWebP } = require("../middlewares/multer-config");

router.get('/', BookController.getAllBooks);
router.post('/', auth, upload, convertToWebP, BookController.addBook);
router.get('/bestrating', BookController.getTopRatedBooks);
router.get('/:id', BookController.getBookById);
router.post('/:id/rating', auth, BookController.rateBook);
router.put('/:id', auth, upload, convertToWebP, BookController.updateBook);
router.delete('/:id', auth, BookController.deleteBook);

module.exports = router;
