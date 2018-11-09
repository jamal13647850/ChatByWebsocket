let socket = io.connect('http://localhost',{
    'forceNew':true
});

socket.on('messages',(data)=>{
    console.log(data);
    document.getElementById('messages').innerHTML = data.map((message)=>{
        return `<div class="row">
                        <form class="message">
                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <div class="name">${message.user} said: ${message.text}</div>
                                <div class="time">a few seconds ago</div><br>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <input class="pull-right" value="0 Likes" type="submit">
                            </div>
                        </form>
                     </div>
                     <hr>`;
    }).join(' ');
});

function sendMessage() {
    let text = document.getElementById("message").value;
    socket.emit("new_message",{
        'message_id' : 6,
        'user' : 'Guest',
        'text' : text,
    });
    document.getElementById("message").value = "";
    return false;
}