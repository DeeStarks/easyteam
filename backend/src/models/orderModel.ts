import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  id: String,
  orderDate: Date,
  customerName: String,
  staffName: String,
  total: Number,
  commission: Number,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
