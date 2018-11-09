let express = require('express');
let app = express();
let server = require('http').Server(app);

server.listen(80);

app.get('/',(request,response)=>{
    response.send('Hello');
});
