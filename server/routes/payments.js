const express = require('express');
const router = express.Router();
const { db } = require('../db');
const { authMiddleware } = require('../middleware/auth');

// Create a simulated order/payment
router.post('/create', authMiddleware, (req, res) => {
  const { product_id, seller_id, amount } = req.body;
  const buyer_id = req.user.id;

  // Verify seller is online before allowing purchase
  db.get('SELECT is_online FROM sellers WHERE id = ?', [seller_id], (err, seller) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!seller || !seller.is_online) {
      return res.status(400).json({ message: 'Seller is currently offline. Purchase disabled.' });
    }

    const sql = 'INSERT INTO orders (product_id, buyer_id, seller_id, amount, status) VALUES (?, ?, ?, ?, "pending")';
    db.run(sql, [product_id, buyer_id, seller_id, amount], function(err) {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ order_id: this.lastID, message: 'Order created, proceed to payment' });
    });
  });
});

// Mock Webhook for payment validation
router.post('/webhook', (req, res) => {
  const { order_id, status, secret } = req.body; // status: 'completed'

  // Security: Simple webhook validation
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Unauthorized webhook call' });
  }

  if (status === 'completed') {
    db.serialize(() => {
      // 1. Update order status
      db.run('UPDATE orders SET status = "completed" WHERE id = ?', [order_id]);

      // 2. Mark product as sold
      db.run('UPDATE products SET status = "sold" WHERE id = (SELECT product_id FROM orders WHERE id = ?)', [order_id]);

      // 3. Update seller analytics
      db.get('SELECT seller_id, amount FROM orders WHERE id = ?', [order_id], (err, order) => {
        if (order) {
          db.run(`UPDATE sellers SET
                  total_sales = total_sales + 1,
                  weekly_sales = weekly_sales + 1,
                  monthly_sales = monthly_sales + 1,
                  total_earnings = total_earnings + ?,
                  weekly_earnings = weekly_earnings + ?,
                  monthly_earnings = monthly_earnings + ?
                  WHERE id = ?`,
            [order.amount, order.amount, order.amount, order.seller_id]);
        }
      });
    });
    return res.json({ message: 'Payment verified and order completed' });
  }
  res.status(400).json({ message: 'Invalid payment status' });
});

// Get order details
router.get('/order/:id', authMiddleware, (req, res) => {
  db.get('SELECT * FROM orders WHERE id = ?', [req.params.id], (err, order) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if user is buyer or seller
    if (req.user.id !== order.buyer_id && req.user.id !== order.seller_id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(order);
  });
});

// Get chat messages for an order
router.get('/messages/:id', authMiddleware, (req, res) => {
  const order_id = req.params.id;

  // Verify user belongs to order AND order is completed (paid)
  db.get('SELECT buyer_id, seller_id, status FROM orders WHERE id = ?', [order_id], (err, order) => {
    if (order && (req.user.id === order.buyer_id || req.user.id === order.seller_id)) {
      if (order.status !== 'completed') {
        return res.status(403).json({ message: 'Chat is locked until payment is verified' });
      }
      db.all('SELECT * FROM messages WHERE order_id = ? ORDER BY created_at ASC', [order_id], (err, messages) => {
        res.json(messages);
      });
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  });
});

module.exports = router;
