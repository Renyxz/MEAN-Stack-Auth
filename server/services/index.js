const http = require('http');
const config = require('../config/config');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



// App
const app = express();



// App setup
app.use(bodyParser.json({ type: '*/*' }));



// Database setup
mongoose.connect(config.db, {
    useMongoClient: true
});

// Check if connected to database:
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ', config.db);
});



// CORS setup
app.use(cors());



// Router setup
const router = require('../router/router');

router(app);



// Server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port);

console.log('Server listening on: ', port);