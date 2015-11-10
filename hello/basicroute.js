var http = require('http');
http.createServer(function(req, res){
	var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
	switch(path){
		case '':
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end('homepage');
			break;
		case '/about':
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end('about');
			break;
		default:
			res.writeHead(200,{'Content-Type':'text/plain'});
			res.end('page not found');
			break;
	}
}).listen(4444);
console.log('Server is listening on port 4444 ....');
