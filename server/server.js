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
let {generateMessage, generateLocationMessage} = require('./utils/message');
let {isRealString} = require('./utils/isRealString');
let {Users} = require('./utils/users');

app.use(morgan('dev'));
app.use(express.static(publicPath));
let users = new Users();

io.on('connection', socket => {
    console.log('A new user is Connected.');

    socket.on('join', (params, cb) => {
        if (!isRealString(params.username) || !isRealString(params.roomname)){
            return cb("Invalid Inputs.");
        }

        socket.join(params.roomname);

        users.removeUser(socket.id);
        users.addUser(socket.id, params.username, params.roomname);

        socket.emit('ServerToClientText', generateMessage("Admin", `Welcome to the ${params.roomname}...!`));
        socket.broadcast.to(params.roomname).emit('ServerToClientText', generateMessage("Admin", `${params.username} is Joined to the Chat Room.`));
        io.to(params.roomname).emit('updateUsers', users.getUserList(params.roomname));

        cb();
    });

    // Server Get the Message
    socket.on('ClientToServerText', (message, cb) => {
        let user = users.getUser(socket.id);
        if (user.name && isRealString(message.text)){
            console.log(message);
            io.to(user.room).emit('ServerToClientText', generateMessage(user.name, message.text));
            cb('Server Done.');
        } else {
            cb('Server Fail.');
        }
    });

    // Server Get Geo Location
    socket.on('ClientToServerGeoLocation', (location) => {
        let user = users.getUser(socket.id);
        if (user.name) {
            console.log(location);
            io.to(user.room).emit('ServerToClientGeoLocation', generateLocationMessage(user.name, location.position.lon, location.position.lat, location.acc));
        }
    });

    // Disconnected
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        io.to(user.room).emit('updateUsers', users.getUserList(user.room));
        io.to(user.room).emit('ServerToClientText', generateMessage('Admin', `${user.name} is left the room.`));
        console.log(`${user.name} is Disconnected.`);
    });
});

// Listen
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
