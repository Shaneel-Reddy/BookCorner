const bookController=require('../controllers/bookController')

const express = require('express')
const router  = express.Router()

router.get('/getbooks',bookController.getallbooks)
router.post('/postbooks',bookController.createbook) 
router.delete('/books/:id',bookController.deletebook)
router.put('/books/:id',bookController.updatebook)

module.exports=router 