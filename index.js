const express = require('express');
require('dotenv').config();

// authentication
const passport = require('passport');
require('./authentication/passport');

// utils
const { connect } = require('./utils/db');

// routes
const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');

// server config
connect();
const PORT = process.env.PORT || 3000;
const server = express();
// const router = express.Router();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(passport.initialize());

// routes
server.use('/books', bookRoutes);
server.use('/users', userRoutes);

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
