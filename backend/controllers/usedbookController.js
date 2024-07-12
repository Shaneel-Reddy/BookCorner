const UsedBook=require('../models/usedbook')

exports.submitbook=async(req,res)=>{
    try{
        const book=new UsedBook(req.body)
        await book.save()
        res.status(201).send(book)
    }
    catch(error){
        res.status(400).send(error)
    }
}
exports.getAllBooks = async (req, res) => {
    try {
      const book = await UsedBook.find({});
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };