const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [{
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'bookinfos', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
  Name: {type: String},
  Address:{ type: String },
  city:{ type: String },
  state:{ type: String },
  Phone:{type: String}
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
