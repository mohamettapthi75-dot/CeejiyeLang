const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { authMiddleware, sellerMiddleware } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Create product
router.post('/', authMiddleware, sellerMiddleware, upload.array('images', 3), (req, res) => {
  const { title, description, price, level, game_category } = req.body;
  const seller_id_sql = 'SELECT id FROM sellers WHERE user_id = ?';

  db.get(seller_id_sql, [req.user.id], (err, seller) => {
    if (err || !seller) return res.status(404).json({ message: 'Seller not found' });

    const images = req.files ? req.files.map(f => f.path) : [];
    const sql = 'INSERT INTO products (seller_id, title, description, price, level, image1, image2, image3, game_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.run(sql, [seller.id, title, description, price, level, images[0], images[1], images[2], game_category], function(err) {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ id: this.lastID, message: 'Product created' });
    });
  });
});

// Get products with filters
router.get('/', (req, res) => {
  const { game, level, seller_id } = req.query;
  let sql = 'SELECT * FROM products WHERE status = "available"';
  let params = [];

  if (game) {
    sql += ' AND game_category = ?';
    params.push(game);
  }
  if (level) {
    sql += ' AND level = ?';
    params.push(level);
  }
  if (seller_id) {
    sql += ' AND seller_id = ?';
    params.push(seller_id);
  }

  db.all(sql, params, (err, products) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(products);
  });
});

// Get single product
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, product) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(product);
  });
});

// Update product
router.put('/:id', authMiddleware, sellerMiddleware, (req, res) => {
  const { title, description, price, level, status } = req.body;
  const sql = 'UPDATE products SET title = ?, description = ?, price = ?, level = ?, status = ? WHERE id = ? AND seller_id = (SELECT id FROM sellers WHERE user_id = ?)';

  db.run(sql, [title, description, price, level, status, req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Product updated' });
  });
});

// Delete product
router.delete('/:id', authMiddleware, sellerMiddleware, (req, res) => {
  const sql = 'DELETE FROM products WHERE id = ? AND seller_id = (SELECT id FROM sellers WHERE user_id = ?)';
  db.run(sql, [req.params.id, req.user.id], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Product deleted' });
  });
});

module.exports = router;
