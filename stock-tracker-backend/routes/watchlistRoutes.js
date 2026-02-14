const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getWatchlist,
  addToWatchlist
} = require('../controllers/watchlistController');

// @route   GET /api/watchlist
// @desc    Get the authenticated user's watchlist
// @access  Private
router.get('/', protect, getWatchlist);

// @route   POST /api/watchlist
// @desc    Add a stock symbol to the authenticated user's watchlist
// @access  Private
router.post('/', protect, addToWatchlist);

module.exports = router;