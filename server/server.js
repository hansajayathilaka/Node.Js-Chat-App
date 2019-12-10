const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const morgan = require('morgan');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(morgan('dev'));
app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('A new user is Connected.');

    // Server Get the Message
    socket.on('sendMsg', message => {

        socket.emit('recMsg', {
            from: "Admin",
            text: "Welcome to the Chat Room...!",
            createdAt: new Date().getTime()
        });

        socket.broadcast.emit('recMsg', {
            from: "Admin",
            text: "Someone is Joined to the Chat Room.",
            createdAt: new Date().getTime()
        });

        socket.on('sendMsg', message => {
            console.log(message);
            io.emit('recMsg', {
                from: message.from,
                text: message.text,
                createdAt: new Date().getTime()
            });
        });
    });

    // Disconnected
    socket.on('disconnect', () => {
        console.log('A user is Disconnected.')
    })
});

// Listen
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
