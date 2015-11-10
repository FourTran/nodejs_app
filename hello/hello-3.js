/*
|-----------------------------------------
| Author : Four Tran
| email : tranvantubk@gmail.com
| say "hello world" with node js
| this time we read from file hello.txt
|-----------------------------------------
*/

var fs = require('fs');
var http = require('http');

http.createServer(function( req, res, err ){
	res.writeHead(200);
	fs.readFile('hello.txt',function(err, data){
		// if(err){
		// 	console.log(err);
		// }
		console.log(data.toString());
		res.write(data.toString());
		res.end();
	});
}).listen(4444);
console.log('listening on port 4444 ...:');