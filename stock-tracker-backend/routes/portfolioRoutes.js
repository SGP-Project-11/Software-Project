const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getPortfolio, addToPortfolio /* , updateStock, removeFromPortfolio */ } = require('../controllers/portfolioController');

router.get('/', protect, getPortfolio);
router.post('/', protect, addToPortfolio);
// router.put('/:id', protect, updateStock);
// router.delete('/:id', protect, removeFromPortfolio);

module.exports = router;