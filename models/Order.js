const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableNo: { type: Number },
  customerName: { type: String, required: true },
  orderType: { type: String, enum: ['Dine-in', 'Takeaway', 'Delivery'], required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Preparing', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
