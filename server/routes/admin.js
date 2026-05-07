const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all pending sellers
router.get('/sellers/pending', authMiddleware, adminMiddleware, (req, res) => {
  db.all('SELECT s.*, u.username, u.email FROM sellers s JOIN users u ON s.user_id = u.id WHERE s.status = "pending"', (err, sellers) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(sellers);
  });
});

// Get all users
router.get('/users', authMiddleware, adminMiddleware, (req, res) => {
  db.all('SELECT id, username, email, role, created_at FROM users', (err, users) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(users);
  });
});

module.exports = router;
