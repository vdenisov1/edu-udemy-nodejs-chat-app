const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit("newMessage", generateMessage("Admin", "Welcome to the Chat App"));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A New User has joined.'));

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage:', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});