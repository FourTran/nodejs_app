/**
| simplechat/app.js
| Four Tran
| tranvantubk@gmail.com
| Demonstrate a chat server using socket.io
**/

var fs =  require('fs');
var express = require('express');
var app = express();
var server = app.listen(4444);
var io = require('socket.io').listen(server);

// index.html
app.get('/', function(req, res){
	fs.createReadStream('index.html').pipe(res);
});

// sockets
io.sockets.on('connection', function(client) {
	client.on('message:client', function(data ){
		client.broadcast.emit('message:server',{message: data.message});
	});
});
