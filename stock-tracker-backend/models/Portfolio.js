const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stocks: [{
    symbol: { type: String, required: true },      // e.g., "RELIANCE.NS", "TCS.NS"
    quantity: { type: Number, required: true },
    buyPrice: { type: Number, required: true },
    buyDate: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);