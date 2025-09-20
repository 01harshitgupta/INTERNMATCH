const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/recommend
router.post('/', async (req, res) => {
  try {
    // Forward the request body to the Python FastAPI model
    const response = await axios.post('http://localhost:8000/recommend/', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations', details: error.message });
  }
});

module.exports = router;
