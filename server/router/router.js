module.exports = (app) => {
    // Home
    app.get('/', (req, res) => {
        res.send('Router is working!');
    });



    // Sign in
    app.post('/signin', /* sign in function */);



    // Sign up
    app.post('/signup', /* sign up function */);



    // User area
    app.get('/user', /* auth strategy, */ (req, res) => {
        res.send('This is the user dashboard area.');
    });
}