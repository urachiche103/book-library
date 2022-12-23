const express = require('express');

// utils
const connect = require('./utils/db');

// server config
connect();
const PORT = 3000;
const server = express();
const router = express.Router();

// routes
const bookRoutes = require('./routes/book.routes');

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// routes
server.use('/books', bookRoutes);

// error control
server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 400;
  next(error);
});
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// server
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
