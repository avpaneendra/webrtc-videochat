/*
var static = require('node-static');
var http = require('http');
//var file = new(static.Server)();
var file = new static.Server('.');
var app = http.createServer(function (req,res){
	file.serve(req,res);
}).listen(process.env.PORT|| 2016, function(){console.log("webrtc 1.0 listen 2016")});
*/
var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({port: 2016},function(){console.log("webrtc 1.0 listen 2016")});

wss.broadcast = function(data) {
    for(var i in this.clients) {
        this.clients[i].send(data);
    }
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });
});