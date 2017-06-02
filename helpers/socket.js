module.exports = function (server, sessionMiddleware) {
    var io = require('socket.io')(server);

    io.use(function (socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.sockets.on('connection', function(socket) {
        var addedUser = false;
        console.log('user connected: ' + socket.request.session.cookie);

        socket.on('disconnect', function () {
            console.log('user disconected' + socket.request.session);
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
}