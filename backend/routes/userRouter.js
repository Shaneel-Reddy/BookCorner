const { signup, login } = require('../controllers/userController');
const { signupValidation, loginValidation } = require('../middlewars/authvalidation');


const express = require('express')
const router  = express.Router()

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

module.exports=router;