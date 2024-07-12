// controllers/orderController.js

const Order = require('../models/order');


exports.addToOrder = async (req, res) => {
  try {
    const { bookId, quantity, type, Name, Address, city, state, Phone } = req.body; // Include new fields here
    const userId = req.user._id;

    let order = await Order.findOne({ userId });

    if (order) {
      const itemIndex = order.items.findIndex(item => item.bookId.toString() === bookId && item.type === type);
      if (itemIndex > -1) {
        order.items[itemIndex].quantity += quantity;
      } else {
        order.items.push({ bookId, quantity, type });
      }
    } else {
      order = new Order({ 
        userId, 
        items: [{ bookId, quantity, type }],
        Name, 
        Address, 
        city, 
        state, 
        Phone
      });
    }

    await order.save();
    res.status(200).json({ success: true, message: 'Order added successfully', order });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const orders = await Order.findOne({ userId }).populate('items.bookId'); 

    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json({ success: true, books: orders.items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
{/*
exports.getBooksInCart = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const cart = await Cart.findOne({ userId }).populate('items.bookId'); 

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ success: true, books: cart.items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
*/}