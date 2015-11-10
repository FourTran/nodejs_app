/*
|-----------------------------------------
| Author : Four Tran
| email : tranvantubk@gmail.com
| say "hello world" with node js
|-----------------------------------------
*/
var http = require('http');

http.createServer(function( req, res ){
	res.writeHead(200);
	res.write("Hello world");
	res.end();
	console.log('we get a vister')
}).listen(4444);
console.log('listening on port 4444 ...:');