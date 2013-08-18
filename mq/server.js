var zmq = require('zmq');
var http = require('http');
var _ = require('underscore');

var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var config = require('./config/basic.js').config;

var server = zmq.socket('rep');

server.bind('tcp://*:' + config.port, function(err) {
	if (err) {
		console.log(err);
	}
});

var events = config.events;

var play = _.throttle(function(sound) {
	exec('play ' + config.soundDir + sound);
}, 500);

server.on('message', function(buffer) {
	var msg = buffer.toString();

	//console.log('got', msg);

	try {
		if (msg && events.hasOwnProperty(msg)) {
			var val = events[msg];

			if (val.type == 'single') {
				play(val.sound);
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

var registerMonitor = function(url, val) {
	var interval;
	var goodPlaying = false;
	var badPlaying = false;
	var child;

	setInterval(function() {
		http.get(url, function(response) {
			if (goodPlaying) {
				return;
			}

			if (badPlaying && child) {
				child.kill();
				badPlaying = false;
			}

			goodPlaying = true;

			child = spawn('play', [config.soundDir + val.good]);

		}).on('error', function(err) {
			//console.log(err);

			if (badPlaying) {
				return;
			}

			if (goodPlaying && child) {
				child.kill();
				goodPlaying = false;
			}

			badPlaying = true;

			child = spawn('play', [config.soundDir + val.bad]);
		});
	}, val.threshold);
};

if (config.monitors) {
	_.each(config.monitors, function(val, url) {
		registerMonitor(url, val);
	});
};
