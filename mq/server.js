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

server.on('message', function(buffer) {
	var msg = buffer.toString();

	//console.log('got', msg);

	try {
		if (msg && events.hasOwnProperty(msg)) {
			var val = events[msg];

			if (val.type == 'single') {
				exec('play ' + config.soundDir + val.sound);
			}

			server.send('OK')
		}
	} catch(e) {
		console.log('ERROR', e);
	}

	server.send('')
});

process.on('SIGINT', function() {
	server.close()
});