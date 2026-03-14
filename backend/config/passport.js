const passport = require('passport');
const User = require('../models/User');
const env = require('./env');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configure Passport.js GoogleStrategy
passport.use(new GoogleStrategy(
    {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://rwpt.onrender.com/api/auth/google/callback",
        passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;

            // 1. Check if user already logged with Google
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                return done(null, user);
            }

            // 2. Check if email already exists with LOCAL provider
            const existingEmailUser = await User.findOne({ email });
            if (existingEmailUser) {
                return done(null, false, {
                    message: "Account already exists with email/password. Please login normally."
                });
            }

            // 3. Otherwise create new Google user
            const newUser = new User({
                googleId: profile.id,
                avatar: profile.photos[0].value,
                name: profile.displayName,
                email: profile.emails[0].value,
                role: "EMPLOYEE",
                status: "ACTIVE",
                provider: "GOOGLE",
                isVerified: true
            });
            user = await newUser.save();
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
))

module.exports = passport;
