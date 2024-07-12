const gbooksController=require('../controllers/gbooksController');

const express = require('express')
const router  = express.Router()

router.get('/gbooks',gbooksController.fetchBooks)



module.exports=router  