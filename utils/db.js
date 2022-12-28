const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/book-library';

mongoose.set('strictQuery', true);

const connect = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  DB_URL,
  connect
};