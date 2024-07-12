const mongoose = require('mongoose');

const usedbookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl:{ type: String, required: true },
  quantity: { type: Number, required: true },
  Address:{ type: String, required: true },
  city:{ type: String, required: true },
  state:{ type: String, required: true },
  zip: { type: String, required: true },
  Phone:{ type: String, required: true },
  price: { type: Number, required: true }
});

const UsedBook = mongoose.model("usedbookinfo", usedbookSchema, "usedbookinfos");

module.exports = UsedBook;
