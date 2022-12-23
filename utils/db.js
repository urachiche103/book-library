const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/book-library';

mongoose.set('strictQuery', true);

const connect = () => mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connect;