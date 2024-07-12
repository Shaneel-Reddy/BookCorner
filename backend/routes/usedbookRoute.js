const usedbookController=require('../controllers/usedbookController')

const express = require('express')
const router  = express.Router()

router.get('/usedbooks', usedbookController.getAllBooks);
router.post('/submit',usedbookController.submitbook) 


module.exports=router 