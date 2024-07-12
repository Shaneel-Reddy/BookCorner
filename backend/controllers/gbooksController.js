const axios = require('axios');
const gbooks = require('../models/gbooks');

const apiurl = 'https://www.googleapis.com/books/v1/volumes';

const booksinfo = async (query) => {
  try {
    const response = await axios.get(`${apiurl}?q=${query}`);
    if (response.data.items && response.data.items.length > 0) {
      const books = response.data.items.map(item => {
        const bookData = item.volumeInfo;
        const saleInfo = item.saleInfo;
        const price = saleInfo && (saleInfo.retailPrice ? saleInfo.retailPrice.amount : 
                                  saleInfo.listPrice ? saleInfo.listPrice.amount : 
                                  'Not available');
        return new gbooks(
          bookData.title,
          bookData.authors ? bookData.authors.join(', ') : 'Unknown',
          bookData.categories?bookData.categories:"",
          bookData.imageLinks ? bookData.imageLinks.thumbnail : '',
          bookData.description?bookData.description:'',
          bookData.averageRating?bookData.averageRating:"-",
          price
        );
      });
      return books;
    } else {
      throw new Error('No books found');
    }
  } catch (error) {
    throw new Error(`Error fetching books: ${error.message}`);
  }
};

const fetchBooks = async (req, res) => {
  const query = req.query.q; 
  if (!query) {
    return res.status(400).json({ message: 'Query parameter q is required' });
  }
  try {
    const books = await booksinfo(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  fetchBooks
};
