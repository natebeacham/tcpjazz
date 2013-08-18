var _ = require('underscore');

var config = require('./config/basic');
var Melody = require('./melody');
var HttpMelody = require('./httpmelody');
var Monitor = require('./monitor');

var server = new Melody(config);

if (config.http) {
	new HttpMelody(config);
};

if (config.monitors && config.monitors.length) {
	_.each(config.monitors, function(val, url) {
		new Monitor(url, val, config);
	});
};

process.on('SIGINT', server.close);