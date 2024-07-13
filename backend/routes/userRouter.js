const { signup, login,getAllUsers} = require('../controllers/userController');
const { signupValidation, loginValidation } = require('../middlewars/authvalidation');


const express = require('express')
const router  = express.Router()

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.get('/users', getAllUsers);

module.exports=router;