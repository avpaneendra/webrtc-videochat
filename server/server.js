var express = require('express');
var app = express();
var http = require('http').createServer(app);
var tools = require(__dirname + '/../tools.js');
var io = require('socket.io')(http);
var url = require('url');
var admin = require('./admin.js');
var users = {};
var userMap = new Map();

console.log(typeof tools.isJson);

function start(route, handle){

    app.use(express.static('public'));
    app.get('/', function(req, res){
        res.sendFile(__rootdir + '/index.html');
    });
    app.get('/users/:name',function(req, res){
        var name = req.param('name');
        res.send(name);
    });

    app.get('/*',function(req, res){
        var pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, res);
    });

    http.listen(process.env.PORT || 2017, function(){
    console.log('listening on *:2017');
    });
}
io.on('connection', function(socket){
    console.log('a user connected', socket.id);
    socket.on('message', function(msg){
        var data;
        var json = tools.isJson(msg);
        if(json) data = JSON.parse(msg);
        else {
            console.log("message not JSON: "+ msg);
            data = {};
        }
        switch ( data.type )
        {
            case 'login':
                socket.data = data;
                if( users[data.name] != null) {
                    socket.send( JSON.stringify({type:'login', success: false, name: data.name}));
                } else {
                    userMap.set(socket, {[socket.data.uid]: socket.data.name});
                    users[socket.data.name] = socket;
                    socket.send( JSON.stringify({type:'login', success: true, name: data.name}));
                    console.log(socket.data.name);
                }

                break;
            case 'offer':
                console.log("Sending offer to", data.name);
                if( users[data.name] != null) {
                  socket.calledUser = data.name;
                  var socketIsCallee = users[data.name];
                  socketIsCallee.send( JSON.stringify({type:'offer', offer: data.offer, name: socket.data.name}));
                }
                break;
            case 'answer':
                console.log("Sending answer to", data.name);
                 if( users[data.name] != null) {
                     socket.calledUser = data.name;
                     var socketIsCaller = users[data.name];
                     socketIsCaller.send( JSON.stringify({type:'answer', answer: data.answer, name: socket.data.name }));
                 }
                 break;
            case 'candidate':
                if(users[data.name] != null){
                    console.log("data.candidate");
                    socket.send( JSON.stringify({type:'candidate', candidate: data.candidate }));
                  }
                break;
            case 'leave':
                var disconnectSocket = users[socket.calledUser];
                if(disconnectSocket != null){
                    disconnectSocket.send( JSON.stringify({type:'leave'}));
                }
                if(data.signOut) {
                    userMap.delete(socket);
                    delete users[socket.data.name];
                    console.log("Sign out: ", data.name );
                }
                break;
            case 'users':
                var userList = Array.from(userMap.values());
                var caller = {uid: socket.data.uid};
                socket.send(JSON.stringify({type:'users', list: userList, caller: caller }));
                break;
            default:
                socket.send( JSON.stringify({type:'error', message: 'Unreckognised error ' + data.type}));
                console.log('case default error');
        }
  });
  socket.on('disconnect', function(){
      var disconnectSocket = users[socket.calledUser];
      if(disconnectSocket != null) disconnectSocket.send( JSON.stringify({type:'leave'}));

      if(socket.data.hasOwnProperty('name')) {
          userMap.delete(socket);
          delete users[socket.data.name];
      }
      console.log('client disconnect');
  });

});
exports.start = start;




