var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);

app.use('/',express.static('app'));

var messages = [
    {
        'message_id' : 1,
        'user' : 'jamal',
        'text' : 'Hello word!',
    },
    {
        'message_id' : 2,
        'user' : 'ahmad',
        'text' : 'contact me !',
    },
    {
        'message_id' : 3,
        'user' : 'bahram',
        'text' : 'please call !',
    },
    {
        'message_id' : 4,
        'user' : 'reza',
        'text' : 'Hello !',
    },
];

io.on('connection',(socket)=>{

    socket.emit('messages',messages);
    console.log("User connected");

    socket.on('new_message',(data)=>{
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});