// routes/orderRoute.js

const express = require('express');
const router = express.Router();
const { addToOrder, getOrders } = require('../controllers/orderController'); 
const ensureAuthenticated = require('../middlewars/auth');

router.post('/addorder', ensureAuthenticated, addToOrder);
router.get('/getorder',ensureAuthenticated, getOrders);  

module.exports = router;
