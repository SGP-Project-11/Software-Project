const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance();   // ← Required in v3+
exports.getStockQuote = async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: 'Symbol is required (e.g., RELIANCE.NS)' });
  }

  try {
    const quote = await yahooFinance.quote(symbol);   // ← use yahooFinance (instance)

    res.json({
      symbol: quote.symbol,
      companyName: quote.shortName || quote.longName,
      currentPrice: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      previousClose: quote.regularMarketPreviousClose,
      open: quote.regularMarketOpen,
      dayHigh: quote.regularMarketDayHigh,
      dayLow: quote.regularMarketDayLow,
      volume: quote.regularMarketVolume,
      currency: quote.currency,
      timestamp: quote.regularMarketTime
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: 'Error fetching stock data', 
      error: err.message 
    });
  }
};

exports.getMultipleQuotes = async (req, res) => {
  const { symbols } = req.query;

  if (!symbols) {
    return res.status(400).json({ message: 'Symbols are required' });
  }

  const symbolArray = symbols.split(',');

  try {
    const quotes = await yahooFinance.quote(symbolArray);   // ← use instance here too
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching multiple quotes', 
      error: err.message 
    });
  }
};