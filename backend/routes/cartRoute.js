const express = require('express');
const router = express.Router();
const { addToCart, getBooksInCart,removeFromCart} = require('../controllers/cartController');
const ensureAuthenticated = require('../middlewars/auth'); 

router.post('/add', ensureAuthenticated, addToCart);
router.get('/get', ensureAuthenticated, getBooksInCart);
router.delete('/remove/:bookId', ensureAuthenticated, removeFromCart);
module.exports = router;
