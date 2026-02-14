const express = require('express');
const { getStockQuote, getMultipleQuotes } = require('../controllers/stockController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/quote', protect, getStockQuote);          // protected or public? Decide
router.get('/quotes', protect, getMultipleQuotes);

module.exports = router;