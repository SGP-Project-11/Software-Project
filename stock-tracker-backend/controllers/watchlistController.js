// controllers/watchlistController.js

const Watchlist = require('../models/Watchlist');

exports.getWatchlist = async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ user: req.user.id });
    if (!watchlist) {
      return res.json({ symbols: [] });
    }
    res.json(watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToWatchlist = async (req, res) => {
  const { symbol } = req.body;

  if (!symbol) {
    return res.status(400).json({ message: 'Symbol is required' });
  }

  try {
    let watchlist = await Watchlist.findOne({ user: req.user.id });

    if (!watchlist) {
      watchlist = new Watchlist({
        user: req.user.id,
        symbols: []
      });
    }

    // Prevent duplicates
    if (!watchlist.symbols.includes(symbol)) {
      watchlist.symbols.push(symbol);
      await watchlist.save();
    }

    res.status(201).json(watchlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};