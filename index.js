__rootdir = __dirname

var server = require('./server/server.js');
var router = require('./server/router.js');
var requestHandler = require('./server/requestHandlers.js');

var handle = {};
handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/upload'] = requestHandler.upload;

server.start(router.route, handle);



