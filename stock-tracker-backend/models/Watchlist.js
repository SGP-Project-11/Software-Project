const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  symbols: [{ type: String, required: true }],   // e.g., ["RELIANCE.NS", "HDFCBANK.NS"]
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);