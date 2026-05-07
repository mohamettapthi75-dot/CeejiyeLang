const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const { initDb, db } = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sellers', require('./routes/sellers'));
app.use('/api/products', require('./routes/products'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('NexuHub API is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket logic
const users = new Map(); // userId -> socketId

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('identify', async (data) => {
    const { userId, isSeller } = data;
    users.set(userId, socket.id);

    if (isSeller) {
      db.run('UPDATE sellers SET is_online = 1 WHERE user_id = ?', [userId]);
    }
  });

  socket.on('send_message', async (data) => {
    const { order_id, sender_id, receiver_id, content } = data;

    // Security: Verify order is completed (paid) before allowing message
    db.get('SELECT status FROM orders WHERE id = ?', [order_id], (err, order) => {
      if (err || !order || order.status !== 'completed') {
        console.log('Message blocked: Order not completed or not found');
        return;
      }

      // Save to DB
      db.run('INSERT INTO messages (order_id, sender_id, receiver_id, content) VALUES (?, ?, ?, ?)',
        [order_id, sender_id, receiver_id, content], function(err) {
        if (!err) {
          const receiverSocketId = users.get(receiver_id);
          if (receiverSocketId) {
            io.to(receiverSocketId).emit('receive_message', {
              id: this.lastID,
              order_id,
              sender_id,
              content,
              created_at: new Date()
            });
          }
        }
      });
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    for (let [userId, socketId] of users.entries()) {
      if (socketId === socket.id) {
        db.run('UPDATE sellers SET is_online = 0 WHERE user_id = ?', [userId]);
        users.delete(userId);
        break;
      }
    }
  });
});
