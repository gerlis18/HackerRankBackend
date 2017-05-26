const express = require('express');
const router = require('express').Router();
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', function(socket) {
    console.log('user conected: '+ socket);
})