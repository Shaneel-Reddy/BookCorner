const Cart = require('../models/cart');

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity, type } = req.body; 
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });
  
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId && item.type === type);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity, type }); 
      }
    } else {
      cart = new Cart({ userId, items: [{ bookId, quantity, type }] }); 
    }
  
    await cart.save();
    res.status(200).json({ success: true, message: 'Book added to cart', cart });
  
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

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


exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

   
    cart.items = cart.items.filter(item => item.bookId.toString() !== bookId);

    await cart.save();

    res.status(200).json({ success: true, message: 'Book removed from cart', cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

