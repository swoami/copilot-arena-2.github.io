const express = require('express');
const { sendContactEmail } = require('../services/emailService');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const result = await sendContactEmail(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas wysyłania wiadomości.' });
  }
});

module.exports = router;
