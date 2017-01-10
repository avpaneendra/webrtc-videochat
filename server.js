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
  //console.log('a user connected', socket);

  
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
          socket.send( JSON.stringify({type:'login', success: false}));
        } else {
          users[data.name] = socket;
          socket.name = data.name;
          socket.send( JSON.stringify({type:'login', success: true}));
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

      default: 
        socket.send( JSON.stringify({type:'error', message: 'Unreckognised error ' + data.type}));
        console.log('case default');
    }
  });
  socket.on('disconnect',function(msg){
    if(users[socket]) delete users[socket];
    console.log('disconnect');
  })
 
});

http.listen(process.env.PORT || 2017, function(){
  console.log('listening on *:2017');
});


/*

switch ( data.type )
    {
      case 'login': 
        if( users[data.name] ) connection.send( JSON.stringify({type:'login', success: false}));
        else connection.send( JSON.stringify({type:'login', success: true}));
      break;

      default: 
         connection.send( JSON.stringify({type:'error',
          message: 'Unreckognised error' + data.type
        }));
    }
*/
/*
var static = require('node-static');
var http = require('http');
//var file = new(static.Server)();
var file = new static.Server('.');
var app = http.createServer(function (req,res){
	file.serve(req,res);
}).listen(process.env.PORT|| 2016, function(){console.log("webrtc 1.0 listen 2016")});
*/

/*
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 7777 });

wss.on('connection', function(connection) {
	var data;
	console.log("User connected");
	
    wss.on('message', function(message) {
        console.log('received: %s', message);
        connection.send(message);
    });
});
*/
/*
const WebSocketServer = require('ws').Server,
  express = require('express'),
  https = require('https'),
  app = express(),
  fs = require('fs');
  
const pkey = fs.readFileSync('./ssl/key.pem'),
  pcert = fs.readFileSync('./ssl/cert.pem'),
  options = {key: pkey, cert: pcert, passphrase: '123456789'};
var wss = null, sslSrv = null;

app.use(express.static('public'));

sslSrv = https.createServer(options, app).listen(2016);
console.log("The HTTPS server is up and running");

wss = new WebSocketServer({server: sslSrv});


wss.on('connection', function (client) {
  console.log("A new WebSocket client was connected.");

  client.on('message', function (message) {

	wss.broadcast(message, client);
    //wss.broadcast(message, client);
  });
});

wss.broadcast = function (data, exclude) {
  var i = 0, n = this.clients ? this.clients.length : 0, client = null;
  if (n < 1) return;
  console.log("Broadcasting message to all " + n + " WebSocket clients.");
  for (; i < n; i++) {
    client = this.clients[i];
    // don't send the message to the sender...
    if (client === exclude) continue;
    if (client.readyState === client.OPEN) client.send(data);
    else console.error('Error: the client state is ' + client.readyState);
  }
};
*/