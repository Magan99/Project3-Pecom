const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  
  bookId: String,
  title: String,
  authors: String, 
  link: String,
  thumbnail: String,  
  description: String,
  publisheddate: String,
  request: Boolean,
  request: Boolean,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
