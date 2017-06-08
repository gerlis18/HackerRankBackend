const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const mongoDB = require('./config/database');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);
//const socketIO = require('./helpers/socket');
const MongoStore = require('connect-mongo')(session);
const auth = require('./middlewares/auth');


mongoose.connect(mongoDB.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${mongoDB.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
});

app.use(session({
    //store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: 'MaratonIG',
    resave: false,
    saveUninitialized: true
}));

//controllers
const users = require('./controllers/users');

const authController = require('./controllers/auth');

const challenges = require('./controllers/challenges');

const challengesDetails = require('./controllers/challengesDetails');

const fileUpload = require('./controllers/fileUpload');

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
app.use('/users', users);

app.use('/auth', authController);

app.use('/challenge',challenges);

app.use('/challengeDetails', auth.isAuth, challengesDetails);

app.use('/upload', fileUpload);

app.get('/', (req, res) => {
    res.send('hola mudno');
    console.log();
    //res.sendFile(__dirname + '/public/client/index.html');
});

//server
server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});