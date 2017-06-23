const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoDB = require('./config/database');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);

mongoose.connect(mongoDB.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${mongoDB.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
});

app.use(session({
    secret: 'MaratonIG',
    resave: false,
    saveUninitialized: true
}));

//controllers
const users = require('./controllers/users');

const authController = require('./controllers/auth');

const challenges = require('./controllers/challenges');

const challengesDetails = require('./controllers/challenges-details');

const fileUpload = require('./controllers/file-upload');

//port
const port = process.env.PORT || 3000;

//Cors Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//BodyParser Middleware
app.use(bodyParser.json());
//app.use(multipart());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//routes
let baseUrl = '/api';

app.use(baseUrl + '/users', users);

app.use(baseUrl + '/auth', authController);

app.use(baseUrl + '/challenge', challenges);

app.use(baseUrl + '/challengeDetails',challengesDetails);

app.use(baseUrl + '/upload', fileUpload);

app.get(baseUrl + '/', (req, res) => {
    res.send('hola mudno');
});

//server
server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});