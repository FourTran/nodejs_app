/**
* soccer
* Author : Four Tran
* email : tranvantubk@gmail.com
* simple project make a soccer website
*
**/


var fs =  require('fs');
var express = require('express');
var app = express();
var server = app.listen(4444);
var io = require('socket.io').listen(server);
var path = require('path');

// set jade template
app.set('view engine','jade');
app.set("views",__dirname+'/views');
app.use(express.static(path.join(__dirname,'public')));
// index.html
app.get('/', function(req, res){
	res.render('index')
});
app.get('/test',function(req, res){
	res.render('test')
});
// sockets
io.sockets.on('connection', function(client) {
	client.on('message:client', function(data ){
		client.broadcast.emit('message:server',{message: data.message});
	});
});
