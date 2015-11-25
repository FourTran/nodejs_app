var express = require('express');
var app = express();
var port = process.env.PORT || 4444;
var io = require('socket.io').listen(app.listen(port));
    require('./config')(app, io);
    require('./routes')(app, io);
console.log('Server is listening on port '+port);
