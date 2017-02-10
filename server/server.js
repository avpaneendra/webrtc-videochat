var express = require('express');
var app = express();
var http = require('http').createServer(app);
var tools = require(__dirname + '/../tools.js');
var io = require('socket.io')(http);
var url = require('url');

var users = {};
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
        var content = route(handle, pathname);
        res.send(content);
    })

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
                console.log('case login');
                if( users[data.name] != null) {
                    socket.send( JSON.stringify({type:'login', success: false, name: data.name}));
                } else {
                    users[data.name] = socket;
                    socket.name = data.name;
                    socket.send( JSON.stringify({type:'login', success: true, name: data.name}));
                }
                console.log('case login: ' + socket.name);
                break;

            case 'offer':
                console.log("Sending offer to", data.name);
                if( users[data.name] != null) {
                  socket.calledUser = data.name;
                  socketIsCallee = users[data.name];
                  socketIsCallee.send( JSON.stringify({type:'offer', offer: data.offer, name: socket.name}));
                }
                break;
            case 'answer':
                console.log("Sending answer to", data.name);
                 if( users[data.name] != null) {
                     socket.calledUser = data.name;
                     socketIsCaller = users[data.name];
                     socketIsCaller.send( JSON.stringify({type:'answer', answer: data.answer, name: socket.name }));
                 }
                 break;
            case 'candidate':
                if(users[data.name] != null){
                    console.log("data.candidate");
                    socket.send( JSON.stringify({type:'candidate', candidate: data.candidate }));
                  }
                break;
            case 'leave':
                console.log("disconnecting from: " + data.name);
                var disconnectUser = users[data.name].calledUser;
                disconnectSocket = users[disconnectUser];
                users[data.name].calledUser = null;
                if(disconnectSocket != null){
                    disconnectSocket.send( JSON.stringify({type:'leave'}));
                }
                break;
            default:
                socket.send( JSON.stringify({type:'error', message: 'Unreckognised error ' + data.type}));
                console.log('case default error');
        }

  });
  socket.on('disconnect',function(){
      if(socket.name != null) delete users[socket.name];
      console.log('client disconnect: ' + socket.id + "_" + socket.name);
  });

});
exports.start = start;




