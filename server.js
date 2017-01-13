var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tools = require('./tools.js');

app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var users = {}; 
console.log(typeof tools.isJson);
io.on('connection', function(socket){
  console.log('a user connected', socket.id);

  
  socket.on('message', function(msg){
    console.log("user msg: "+ msg);
    var data;
    var json = tools.isJson(msg);
    if(json) data = JSON.parse(msg);

    switch ( data.type )
    {
      case 'login': 
        console.log('case login');
        if( users[data.name] != null) { 
          socket.send( JSON.stringify({type:'login', success: false, name: data.name}));
        } else {
          users[data.name] = socket;
          socket.name = data.name;
          socket.send( JSON.stringify({type:'login', success: true, name: data.name}));
        }
        break;
      
      case 'offer':
        console.log("Sending offer to", data.name);
        if( users[data.name] != null) { 
          socket.calledUser = data.name;
          socket.send( JSON.stringify({type:'offer', offer: data.offer, name: socket.name}));
        }
        break;
      case 'answer':
        console.log("Sending answer to", data.name);
         if( users[data.name] != null) {
          socket.calledUser = data.name;
          socket.send( JSON.stringify({type:'answer', answer: data.answer }));
         }
        break;
      case 'candidate':
        if(users[data.name] != null){
          socket.send( JSON.stringify({type:'candidate', candidate: data.candidate }));
          }
        break;
      case 'leave':
        console.log("disconnected from: " + data.name);
        users[data.name].calledUser = null;
        if(users[data.name] != null){
          socket.send( JSON.stringify({type:'leave'}));
          }
        break;
      default: 
        socket.send( JSON.stringify({type:'error', message: 'Unreckognised error ' + data.type}));
        console.log('case default');
    }

  });
  socket.on('disconnect',function(){
    var userDisconnect = socket.id + ", ";
    if(socket.name != null)  {
      userDisconnect += socket.name;
      delete users[socket.name];
    }
    console.log('client disconnect: ' + userDisconnect);
  });
 
});

http.listen(process.env.PORT || 2017, function(){
  console.log('listening on *:2017');
});