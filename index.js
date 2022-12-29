const express = require('express');
// const path = require('path');
require('dotenv').config();

// authentication
// const session = require('express-session');
const passport = require('passport');
require('./authentication/passport');

// utils
const { connect } = require('./utils/db');

// routes
const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');
const { session } = require('passport');

// server config
connect();
const PORT = process.env.PORT || 3000;
const server = express();
// const router = express.Router();

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// server.use(
  // session({
    // secret: process.env.SESSION_SECRET || 'upgradehub_node', // REVISAR ESTE TEMA
    // resave: false,
    // saveUninitialized: false,
    // cookie: {
      // maxAge: 3600000
    // },
  // })
// );
server.use(passport.initialize());
server.use(passport.session());
// server.use(express.static(path.join(__dirname, 'public')));

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
