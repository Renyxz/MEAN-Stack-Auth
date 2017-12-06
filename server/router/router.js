const passport = require('passport');
const Auth = require('../controllers/auth');
const passportService = require('../services/passport');


// Auth strategies
const requireAuth = passport.authenticate('jwt', { session: false });


module.exports = (app) => {
    // Home
    app.get('/', (req, res) => {
        res.send('Router is working!');
    });



    // Sign in
    app.post('/signin', Auth.signin);



    // Sign up
    app.post('/signup', Auth.signup);



    // User area
    app.get('/user', requireAuth, (req, res) => {
        res.send('This is the user dashboard area.');
    });
}