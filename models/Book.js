const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    author: { type: String, required: true },
    country: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number },
    title: { type: String, required: true },
    year: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;