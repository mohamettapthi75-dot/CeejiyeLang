const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Apply to become a seller
router.post('/apply', authMiddleware, (req, res) => {
  const { shop_name, game_category, shop_image } = req.body;
  const user_id = req.user.id;

  const sql = 'INSERT INTO sellers (user_id, shop_name, game_category, shop_image) VALUES (?, ?, ?, ?)';
  db.run(sql, [user_id, shop_name, game_category, shop_image], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: 'Application submitted successfully', seller_id: this.lastID });
  });
});

// Admin: Approve/Reject seller
router.put('/approve/:id', authMiddleware, adminMiddleware, (req, res) => {
  const { status } = req.body; // 'approved' or 'rejected'
  const seller_id = req.params.id;

  const sql = 'UPDATE sellers SET status = ? WHERE id = ?';
  db.run(sql, [status, seller_id], function(err) {
    if (err) return res.status(500).json({ message: err.message });

    // If approved, update user role to seller
    if (status === 'approved') {
      db.run('UPDATE users SET role = "seller" WHERE id = (SELECT user_id FROM sellers WHERE id = ?)', [seller_id]);
    }

    res.json({ message: `Seller ${status}` });
  });
});

// Get seller shop by ID
router.get('/shop/:id', (req, res) => {
  const sql = 'SELECT * FROM sellers WHERE id = ? AND status = "approved"';
  db.get(sql, [req.params.id], (err, seller) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!seller) return res.status(404).json({ message: 'Shop not found' });
    res.json(seller);
  });
});

// Get sellers by game category
router.get('/game/:game', (req, res) => {
  const { game } = req.params;
  const { level } = req.query;

  let sql = 'SELECT * FROM sellers WHERE game_category = ? AND status = "approved"';
  let params = [game];

  if (level) {
    sql = `SELECT DISTINCT s.* FROM sellers s
           JOIN products p ON s.id = p.seller_id
           WHERE s.game_category = ? AND s.status = "approved" AND p.level = ? AND p.status = "available"`;
    params.push(level);
  }

  db.all(sql, params, (err, sellers) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(sellers);
  });
});

module.exports = router;
