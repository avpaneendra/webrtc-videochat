__rootdir = __dirname;

var server = require('./server/server.js');
var router = require('./server/router.js');
var admin = require('./server/admin.js');
var requestHandler = require('./server/requestHandlers.js');

var handle = {};
var prodMode = false;
handle['/'] = requestHandler.start;
handle['/start'] = requestHandler.start;
handle['/upload'] = requestHandler.upload;

server.start(router.route, handle);
admin.initAdmin(prodMode);



