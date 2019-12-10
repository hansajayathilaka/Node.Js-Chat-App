let socket = io();

socket.on('connect', () => {
    console.log('Connected to Server.');

    // Send Message
    socket.emit('sendMsg', {
        from: "WDJ",
        text: "Hello World!"
    });
});

// Disconnected
socket.on('disconnect', () => {
    console.log('Disconnect from Server.')
});

// Receive Message
socket.on('recMsg', message => {
    console.log(message);
});
