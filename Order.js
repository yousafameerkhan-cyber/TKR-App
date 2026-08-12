const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableNo: { type: Number }, // Dine-in ke liye
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  orderType: { type: String, enum: ['Dine-in', 'Takeaway', 'Delivery'], required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Preparing', 'Ready', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
