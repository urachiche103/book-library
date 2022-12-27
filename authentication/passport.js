const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');

const saltRounds = 10;

passport.use(
    'register', 
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            // nameField: 'name',
            // lastNameField: 'lastName',
            // phoneNumberField: 'phoneNumber',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const previousUser = await User.findOne({ email: email });
                if (previousUser) {
                    const error = new Error('The user is already registered!');
                    return done(error);
                }
                const pwdHash = await bcrypt.hash(password, saltRounds);
                const newUser = new User({
                    email: email,
                    password: pwdHash,
                });
                const savedUser = await newUser.save();
                done(null, savedUser);
            } catch (error) {
                return done(error);
            }
        }
    )
);