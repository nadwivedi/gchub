const express = require('express');
const router = express.Router();
const { chatWithBot } = require('../controllers/chatbotController');

// POST /api/chatbot
router.post('/', chatWithBot);

module.exports = router;
