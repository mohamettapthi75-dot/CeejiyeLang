const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';

    db.run(sql, [username, email, hashedPassword, role], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: err.message });
      }

      const userId = this.lastID;
      const token = jwt.sign({ id: userId, username, role }, process.env.JWT_SECRET || 'nexuhub_secret', { expiresIn: '7d' });

      res.status(201).json({ token, user: { id: userId, username, email, role } });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'nexuhub_secret', { expiresIn: '7d' });

    // If seller, get seller info too
    if (user.role === 'seller') {
      db.get('SELECT * FROM sellers WHERE user_id = ?', [user.id], (err, seller) => {
        res.json({ token, user: { ...user, sellerInfo: seller } });
      });
    } else {
      res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    }
  });
});

module.exports = router;
