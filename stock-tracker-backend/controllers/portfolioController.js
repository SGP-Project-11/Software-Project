const Portfolio = require('../models/Portfolio');

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) return res.json({ stocks: [], totalValue: 0, totalGain: 0 });

    // Fetch current prices for all symbols
    const symbols = portfolio.stocks.map(s => s.symbol);
    const quotes = await yahooFinance.quote(symbols);

    let totalValue = 0;
    let totalGain = 0;

    const enrichedStocks = portfolio.stocks.map(stock => {
      const quote = quotes.find(q => q.symbol === stock.symbol) || {};
      const currentPrice = quote.regularMarketPrice || 0;
      const value = stock.quantity * currentPrice;
      const gain = value - (stock.quantity * stock.buyPrice);

      totalValue += value;
      totalGain += gain;

      return {
        ...stock.toObject(),
        currentPrice,
        currentValue: value,
        unrealizedGain: gain,
        gainPercent: stock.buyPrice ? (gain / (stock.quantity * stock.buyPrice)) * 100 : 0
      };
    });

    res.json({
      stocks: enrichedStocks,
      totalCurrentValue: totalValue,
      totalUnrealizedGain: totalGain
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToPortfolio = async (req, res) => {
  const { symbol, quantity, buyPrice } = req.body;

  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user.id, stocks: [] });
    }

    portfolio.stocks.push({ symbol, quantity, buyPrice });
    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add delete/update as needed