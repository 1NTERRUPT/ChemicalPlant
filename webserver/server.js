// server initialization:
var express = require('express'),		            // include express.js
	io = require('socket.io'),				        // include socket.io
	app = express(),						        // make an instance of express.js
 	server = app.listen(8080),		                // start a server with the express instance
	socketServer = io(server);	 			        // make a socket server using the express server

// serial port initialization:
var serialport = require('serialport'),			    // include the serialport library
	SerialPort = serialport.SerialPort,	            // make a local instance of serial
	portName = process.argv[2],		                // get the port name from the command line
	portConfig = {
		parser: serialport.parsers.readline('\n')
	};

// open the serial port:
var myPort = new SerialPort(portName, portConfig);

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
    exec('mpg123 ../resource/siren.mp3');
    
    myPort.write(data);                 // send the data to the serial device
    myPort.write("\n");
  });
});

