var _ = require('underscore');
var zmq = require('zmq');
var exec = require('child_process').exec;

var Melody = function(config) {
	this.config = config;
	this.events = config.events;
	this.socket = zmq.socket('rep');

	_.bindAll(this, 'bind', 'play', 'communicate', 'close');

	this.bind();
};

Melody.prototype.bind = function() {
	this.socket.bind('tcp://*:' + this.config.port, function(err) {
		if (err) {
			console.log(err);
		}
	});

	this.socket.on('message', this.communicate);
};

Melody.prototype.play = _.throttle(function(sound) {
	exec('play ' + this.config.soundDir + sound);
}, 500);

Melody.prototype.communicate = function(buffer) {
	var msg = buffer.toString();

	//console.log('got', msg);

	if (msg && this.events.hasOwnProperty(msg)) {
		var e = this.events[msg];

		if (e.type == 'single') {
			this.play(e.sound);
		}

		this.socket.send('OK')
	}

	this.socket.send('')
};

Melody.prototype.close = function() {
	this.socket.close();
};

module.exports = Melody;
