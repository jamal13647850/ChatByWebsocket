let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(80);

app.use('/',express.static('app'));

io.on('connection',(socket)=>{
    let messages = [
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
    socket.emit('messages',messages);
    console.log("User connected");
});