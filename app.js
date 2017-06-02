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
//const socketIO = require('./helpers/socket');
const RedisStore = require('connect-redis')(session);


mongoose.connect(mongoDB.database);

mongoose.connection.on('connected', () => {
    console.log(`Connected to database: ${mongoDB.database}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
});



//controllers
const users = require('./controllers/users');

const challenges = require('./controllers/challenges');

const challengesDetails = require('./controllers/challengesDetails');

const images = require('./controllers/images');

//port
const port = process.env.PORT || 3000;

//Cors Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//BodyParser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//express-session Middleware
var sessionMiddleware = session({
    store: new RedisStore({}),
    secret: 'MaratonIG',
    resave: false,
    saveUninitialized: false
});
app.use(sessionMiddleware);
//socketIO(server, sessionMiddleware);

//routes
app.use('/users', users);

app.use('/challenge', challenges);

app.use('/challengeDetails', challengesDetails);

app.use('/image', images);

app.get('/', (req, res) => {
    res.send('hola mudno');
    //res.sendFile(__dirname + '/public/client/index.html');
});

    var io = require('socket.io')(server);

    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.sockets.on('connection', function(socket) {
        var addedUser = false;
        console.log(socket.request.sessionID);

        socket.on('disconnect', function () {
            console.log(socket.request.session);
        });

        socket.on('add-message', (message) => {
            io.emit('message', {
                type: 'new-message',
                text: message,
                session: socket.request.session
            });
            console.log(`${socket.username}: ${message}`);
        });

        socket.on('add-user', (username) => {
            if (addedUser) return;
            socket.username = username;
            addedUser = true;
            socket.broadcast.emit('user', socket.username);
            
        });
    });


server.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});