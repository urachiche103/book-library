const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/register', (req, res, next) => {
    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            }
            return res.status(201).json(user)
        });
};
passport.authenticate('register', done)(req);
});

module.exports = router;