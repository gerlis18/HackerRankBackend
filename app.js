const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoDB = require('./config/database');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

mongoose.connect(mongoDB.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${mongoDB.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
})


const app = express();

const users = require('./routes/users');

const tests = require('./routes/tests');

const usersTests = require('./routes/userTest');

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


//routes
app.use('/users', users);

app.use('/tests', tests);

app.use('/userTests', usersTests);

app.get('/', (req, res) => {
    res.send('invalid endpoint');
});



app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
