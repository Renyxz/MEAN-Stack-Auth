const config = require('../config/config');
const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const jwt = require('jwt-simple'); // Will use this one since its attributes are more sementic.



// Sign up / User registration
exports.signup = (req, res, next) => {
    // Data from the requst:
    const email = req.body.email;
    const password = req.body.password;

    // Check for existing user by email
    User.findOne({ email: email }, (error) => {
        // In case of error:
        if (error) return next(error);


        // Otherwise, create new user:
        const user = new User({
            email: email,
            password: password
        });
    
        // Save user
        user.save( (error) => {

            // In case of duplicate user error:
            const alreadyExists = 11000;
            
            if (error && error.code === alreadyExists) {

                return res.json({
                    success: false, 
                    msg: 'There is already an account signed up with this email!'
                });

            }

    
            // Otherwise, respond to request:
            res.json({
                success: true, 
                msg: 'You are now a user!',
                token: userToken(user)
            });

        });

    });    

}



// Sign in
exports.signin = (req, res, next) => {
    const user = req.user;

    res.json({ token: userToken(user) });
}



// Generate token for user
function userToken(user) {
    // console.log('USER: ', user.id);

    const timestamp = new Date().getTime();

    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}