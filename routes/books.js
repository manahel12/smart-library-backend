const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.get('/', auth, bookController.getAllBooks);
router.post('/', auth, bookController.addBook);
router.delete('/:id', auth, bookController.deleteBook);
router.get('/search', auth, bookController.searchBooks);

module.exports = router;