var http = require('http');
      fs = require('fs');

function serverStaticFile(res, path, contentType, responseCode){
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path,function(err, data){
		console.log(__dirname + path);

		if(err){
		   	res.writeHead(500, {'Content-Type':'text/plain'});
			res.end('500- Internal Error');
		} else {
			res.writeHead(responseCode,{'Content-Type' : contentType});
			res.end(data);
		}
	});
} 
http.createServer(function(req, res){
	var path = req.url.replace(/\/?(:\?.*)?$/,'').toLowerCase();
	switch(path){
		case '':
			serverStaticFile(res,'/underground/index.html','text/html');
			break;
		case '/about':
			serverStaticFile(res,'/underground/about.html','text/html');
			break;
		case '/image.jpg':
			serverStaticFile(res,'/underground/images/image.jpg','image/jpeg');
			break;
		default:
			serverStaticFile(res,'404.html','text/html',404);
			break;
	}
}).listen(4444);
console.log('Server is listening on port 4444 ....');
