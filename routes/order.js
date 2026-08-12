const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. Naya Order Place Karne ki API
router.post('/create', async (req, res) => {
  try {
    const { tableNo, customerName, customerPhone, orderType, items, totalAmount } = req.body;
    
    const newOrder = new Order({
      tableNo,
      customerName,
      customerPhone,
      orderType,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, message: 'Order placed successfully!', data: savedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Tamam Active Orders Dekhne ki API (Kitchen ya Admin ke liye)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.menuItem');
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Order Status Update Karne ki API (Pending -> Preparing -> Ready -> Completed)
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Order status updated!', data: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
