var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: 'test123',
        text: 'hello world',
    });
});

socket.on('disconnect', function () { 
    console.log('Disconnected from server');
});

socket.on('newMessage', function (data) {
    console.log('New Message:', JSON.stringify(data));
});