let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(80);

app.use('/',express.static('app'));

io.on('connection',(socket)=>{
    console.log("User connected");
});