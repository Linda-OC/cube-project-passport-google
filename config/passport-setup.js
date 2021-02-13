const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
const User = require('../models/user');


//passport session setup
passport.use(
    new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        }, (accessToken,refreshToken,profile,done) => {
            //passport callback function
            console.log('passport callback function fired');
            console.log(profile);
            new User({
                username: profile.displayName,
                googleId: profile.id,
            }).save().then((newUser) => {
                console.log('new user created: ' + newUser);
            });
        }
    )
);
