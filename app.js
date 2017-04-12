const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const session = require('express-session');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${config.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

//Cors Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//express-session Middleware
app.use(session({
    secret: 'keyboard dog', 
    resave: false, 
    saveUninitialized: false
}));

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
