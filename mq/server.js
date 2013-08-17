var zmq = require('zmq');
var config = require('./config/basic.js').config;
var exec = require('child_process').exec;

var server = zmq.socket('rep');

server.bind('tcp://*:' + config.port, function(err) {
	if (err) {
		console.log(err);
	}
});

var events = config.events;

server.on('message', function(msg) {
	if (!msg) {
		return;
	}

	if (events.hasOwnProperty(msg)) {
		var val = events[msg];

		if (val.type == 'single') {
			exec('play ' + config.soundDir + val.sound);
		}
	}
});

process.on('SIGINT', function() {
	server.close()
});