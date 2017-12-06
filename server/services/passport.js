const config = require('../config/config');
const User = require('../models/user');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// Create local strategy
const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    
    // Validate email & password:
    User.findOne({ email: email.toLowerCase() }, (error, user) => {
        
        // In case of error:
        if (error) return done(error);

        // If not user is found with email, call done with false:
        if (!user) return done(null, false);

        // Otherwise, proceed to compare encrypted passwords:
        user.comparePassword(password, (error, isMatch) => {
            // In case of error:
            if (error) return done(error);

            // If password is not matched, call done with false:
            if (!isMatch) return done(null, false);

            // Otherwise, call done with 'user':
            return done(null, user);

        });

    });

});




// Create JWT strategy
// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    
    // Check from payload for existing user ID in database:
    User.findById(payload.sub, (error, user) => {

        // In case of error:
        if (error) return done(error, false);

        // If user ID exists, call done with user:
        (user) ? done(null, user)

        // Otherwise, call done with false:
        : done(null, false);
    });

});



// Initialize both strategies
passport.use(jwtLogin);
passport.use(localLogin);