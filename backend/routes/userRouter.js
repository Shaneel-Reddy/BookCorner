const { signup, login,getAllUsers} = require('../controllers/userController');
const { signupValidation, loginValidation } = require('../middlewars/authvalidation');
const authMiddleware = require('../middlewars/auth');
const adminMiddleware = require('../middlewars/adminMiddleware');
const express = require('express')
const router  = express.Router()

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/users', authMiddleware, adminMiddleware,getAllUsers);

module.exports=router;