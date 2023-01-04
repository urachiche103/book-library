const express = require('express');
const path = require('path');
require('dotenv').config();

// authentication
const session = require('express-session');
const passport = require('passport');
require('./authentication/passport');

// utils
const { connect } = require('./utils/db');
const logError = require('./utils/log');

// routes
const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');

// server config
connect();
const PORT = process.env.PORT || 3000;
const server = express();

// middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  session({
    secret: process.env.SESSION_SECRET || 'upgradehub_node', // REVISAR ESTE TEMA
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000
    },
  })
);
server.use(passport.initialize());
server.use(passport.session());
// server.use(express.static(path.join(__dirname, 'public')));

// routes
server.use('/books', bookRoutes);
server.use('/users', userRoutes);

// error control
server.use('*', (req, res, next) => {
  const msg = 'Route not found';
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
  const log = `${msg}
  ${req.path}
  ${new Date().toISOString()}\n`;
  logError(log);
});
server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// server
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
