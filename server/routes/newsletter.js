const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Tutaj logika zapisu do newslettera
  res.json({ success: true });
});

module.exports = router;
