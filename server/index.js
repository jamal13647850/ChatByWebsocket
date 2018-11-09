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
        'likedBy':[
            2134214321,23453543
        ],
        'ts':1541794235903,
    },
    {
        'message_id' : 2,
        'user' : 'ahmad',
        'text' : 'contact me !',
        'likedBy':[],
        'ts':1541794235903,
    },
    {
        'message_id' : 3,
        'user' : 'bahram',
        'text' : 'please call !',
        'likedBy':[],
        'ts':1541794235903,
    },
    {
        'message_id' : 4,
        'user' : 'reza',
        'text' : 'Hello !',
        'likedBy':[],
        'ts':1542344235903,
    },
];

io.on('connection',(socket)=>{

    socket.emit('messages',messages);
    console.log("User connected");

    socket.on('new_message',(data)=>{
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
    socket.on('update_likes',(data)=>{
        var message = messages.filter(function (message) {
            return message.message_id == data.message_id;
        })[0];
        message.likedBy = data.likedBy;
        io.sockets.emit('messages',messages);
    });
});
