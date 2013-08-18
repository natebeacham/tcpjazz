var _ = require('underscore');
var http = require('http');
var url = require('url');
var spawn = require('child_process').spawn;

var HttpMelody = function(config) {
	this.soundDir = config.soundDir;
	this.config = config.http;

	_.bindAll(this, 'bind', 'handle');

	this.bind();
};

HttpMelody.prototype.bind = function() {
	this.server = http.createServer(this.handle);
	this.server.listen(this.config.port);
};

HttpMelody.prototype.handle = function(request, response){  
	var params = url.parse(request.url, true).query;

	console.log(params)
	console.log(this.config.events);
	console.log(params.e in this.config.events);

	if (params.e && params.e in this.config.events) {
		spawn('play', [this.soundDir + this.config.events[params.e]]);
	}

	response.writeHeader(200);
	response.end();
};

module.exports = HttpMelody;