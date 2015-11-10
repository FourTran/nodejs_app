/*
|-----------------------------------------
| Author : Four Tran
| email : tranvantubk@gmail.com
| say "hello world" with node js
| this time we have timeout for a request
|-----------------------------------------
*/
var http = require('http');

http.createServer(function( req, res ){
	res.writeHead(200);
	res.write("four is here ....");
	setTimeout(function() {
		res.write("sorry four have just gone!!");
		res.end();
	}, 5000);
	console.log('we get a vister');
}).listen(4444);
console.log('listening on port 4444 ...:');