var _ = require('underscore');
var zmq = require('zmq');
var exec = require('child_process').exec;

var Jazz = function(config) {
	this.config = config;
	this.events = config.events;
	this.socket = zmq.socket('rep');

	_.bindAll(this, 'bind', 'play', 'communicate', 'close');

	this.bind();
};

Jazz.prototype.bind = function() {
	this.socket.bind('tcp://*:' + this.config.port, function(err) {
		if (err) {
			console.log(err);
		}
	});

	this.socket.on('message', this.communicate);
};

Jazz.prototype.play = _.throttle(function(sound) {
	exec('mplayer ' + this.config.soundDir + sound);
}, 500);

Jazz.prototype.communicate = function(buffer) {
	var msg = buffer.toString();

	if (msg && this.events.hasOwnProperty(msg)) {
		var e = this.events[msg];

		if (e.type == 'single') {
			this.play(e.sound);
		}

		this.socket.send('OK')
	}

	this.socket.send('')
};

Jazz.prototype.close = function() {
	this.socket.close();
};

module.exports = Jazz;
