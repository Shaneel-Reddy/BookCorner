const Book=require("../models/book")

exports.getallbooks=async(req,res)=>{
    try {
        const books = await Book.find({})
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error getting books' });
    }
}

exports.createbook=async(req,res)=>{
    try{
        const book=new Book(req.body)
        await book.save()
        res.status(201).send(book)
    }
    catch(error){
        res.status(500).send(error)
    }
}

exports.deletebook=async(req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.params.id)
        if(!book)
        {
            return res.status(404).send("book not found")
        }
        res.send(book)
    }catch(error){
        res.status(500).send(error)
    }
}

exports.updatebook= async(req,res)=>{
    try{
        const book=await Book.findByIdAndUpdate(req.params.id,req.body)
        if(!book)
            {
                return res.status(404).send("book not found")
            }
            res.send(book)
    }catch(error){
        res.status(500).send(error)
    }
}