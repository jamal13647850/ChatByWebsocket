let socket = io.connect('http://localhost',{
    'forceNew':true
});

var user = getUser() || generateUser();

function getUser() {
    const user = localStorage.getItem('user');
    if(user){
        return JSON.parse(user);
    }
    return false;
}

function generateUser(){
    let uid , uname;
    uid = generateRandom();
    uname = prompt("Please enter your name:");
    if(uname===""){
        uname="Guest";
    }
    user = {
        'id':uid,
        'name':uname
    };
    localStorage.setItem('user',JSON.stringify(user) );
    return user;
}
function generateRandom(){
    return Math.floor(Math.random() * 1e11);
}

var messageCache;
socket.on('messages',(data)=>{
    console.log(data);
    messageCache = data;
    render();
});

function render() {
    var data = messageCache;
    document.getElementById('messages').innerHTML = data.map((message,index)=>{
        return `<div class="row">
                        <form class="message" onsubmit="return addLike(messageCache[${index}])">
                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                                <div class="name">${message.user} said: ${message.text}</div>
                                <div class="time">a few seconds ago</div><br>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <input class="pull-right" value="${message.likedBy.length} Likes" type="submit">
                            </div>
                        </form>
                     </div>
                     <hr>`;
    }).join(' ');
}
function addLike(message) {
    var index = message.likedBy.indexOf(user.id);
    if(index<0){
        message.likedBy.push(user.id);
    }
    else{
        message.likedBy.splice(index,1);
    }
    socket.emit('update_likes',message);
    render();
    return false
}

function sendMessage() {
    let text = document.getElementById("message").value;
    socket.emit("new_message",{
        'message_id' : generateRandom(),
        'user' : user.name,
        'text' : text,
        'likedBy':[],
    });
    document.getElementById("message").value = "";
    return false;
}