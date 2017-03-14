// server initialization:
var express = require('express'),		            // include express.js
	io = require('socket.io'),				        // include socket.io
	app = express(),						        // make an instance of express.js
 	server = app.listen(3000),		                // start a server with the express instance
	socketServer = io(server);	 			        // make a socket server using the express server

//  set up server and socketServer listener functions:
app.use(express.static('../html'));		            // DocumentRoot where html files are located

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({server: server});

app.get('/:name', serveFiles);						// listener for all static file requests

function serveFiles(request, response) {
	var fileName = request.params.name;				    // get the file name from the request
	response.sendFile(fileName, { root: __dirname });   // send the file
}

var exec = require('child_process').exec,
    child;


wss.on('connection', function connection(ws) {
  ws.on('message', function(data, flags) {
    // flags.binary will be set if a binary data is received.
    // flags.masked will be set if the data was masked.
    console.log(data);
  });
});

