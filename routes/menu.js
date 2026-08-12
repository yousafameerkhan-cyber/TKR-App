const express = require('express');
const router = express.Router();
const MenuItem = require('../models/Menu');

// 1. Menu Item Add Karne ki API (Admin ke liye)
router.post('/add', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json({ success: true, data: savedItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Saara Menu Fetch Karne ki API (Customers/App ke liye)
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json({ success: true, data: menuItems });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
