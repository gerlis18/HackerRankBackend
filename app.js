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
const io = require('socket.io')(server);

mongoose.connect(mongoDB.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${mongoDB.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
})

const users = require('./controllers/users');

const challenges = require('./controllers/challenges');

const challengesDetails = require('./controllers/challengesDetails');

const socketIO = require('./helpers/socket');

const port = process.env.PORT || 3000;

//Cors Middleware
app.use(cors());

//formidable
//app.use(formidable());


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//express-session Middleware
app.use(session({
    secret: 'MaratonIG',
    resave: false,
    saveUninitialized: false
}));


require('./config/passport')(passport);


//routes
app.use('/users', users);

app.use('/challenge', challenges);

app.use('/userTests', challengesDetails);

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/client/index.html');
});

io.on('connection', function (socket) {
    var addedUser = false;

    socket.on('disconnect', function () {
        console.log('user disconected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', {
            type: 'new-message',
            text: message
        });
        console.log(`${socket.username}: ${message}`);
    });

    socket.on('add-user', (username) => {
        if (addedUser) return;
        socket.username = username;
        addedUser = true;
        socket.broadcast.emit('user', socket.username);
        console.log('user connected: ' + username);
    });
});

server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});