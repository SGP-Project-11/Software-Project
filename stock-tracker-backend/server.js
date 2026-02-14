const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
// const portfolioRoutes = require('./routes/portfolioRoutes');
// const watchlistRoutes = require('./routes/watchlistRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/watchlist', watchlistRoutes);

// Error handler
app.use(errorHandler);


app.use('/api/portfolio', portfolioRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});