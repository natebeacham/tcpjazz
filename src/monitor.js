var _ = require('underscore');
var http = require('http');
var spawn = require('child_process').spawn;

var Monitor = function(url, config, settings) {
	this.url = url;
	this.config = config;
	this.settings = settings;

	this.interval = null;
	this.sane = null;
	this.child = null;

	_.bindAll(this, '_init', 'up', 'down')

	this._init();
};

Monitor.prototype.up = function(response) {
	if (this.sane) {
		return;
	}

	if (!this.sane && this.child) {
		this.child.kill();
	}

	this.sane = true;

	this.child = spawn('play', [this.settings.soundDir + this.config.good, 'repeat']);
};

Monitor.prototype.down = function(err) {
	//console.log(err);

	if (!this.sane && this.sane != null) {
		return;
	}

	if (this.sane && this.child) {
		this.child.kill();
	}

	this.sane = false;

	this.child = spawn('play', [this.settings.soundDir + this.config.bad, 'repeat']);
};

Monitor.prototype._init = function() {
	var that = this;

	var ping = function() {
		http.get(that.url, that.up).on('error', that.down);
	};

	setInterval(ping, this.config.threshold);
};

module.exports = Monitor;
