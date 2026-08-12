const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));

let orders = [];

// API: Get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// API: Create new order
app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: 'TKR-' + Math.floor(1000 + Math.random() * 9000),
    ...req.body,
    status: 'Pending',
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + new Date().toLocaleDateString() + ')'
  };
  orders.unshift(newOrder);
  
  // Broadcast to all connected clients (Admin, Waiter, Customer)
  io.emit('refreshOrders', newOrder);
  res.json({ success: true, order: newOrder });
});

// API: Update order status
app.post('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.id === id);
  
  if (order) {
    order.status = status;
    io.emit('refreshOrders', order);
    res.json({ success: true, order });
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

io.on('connection', (socket) => {
  socket.on('callWaiter', (data) => {
    io.emit('waiterCalled', data);
  });
});

server.listen(5000, () => {
  console.log('TKR Server running on port 5000');
});
