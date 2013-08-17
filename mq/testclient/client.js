var zmq = require('zmq');

var client = zmq.socket('req');

client.connect('tcp://localhost:5000');

client.send('ping');

process.on('SIGINT', function() {
	client.close();
})