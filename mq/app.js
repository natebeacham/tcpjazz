var _ = require('underscore');

var config = require('./config/basic');
var Melody = require('./melody');
var Monitor = require('./monitor');

var server = new Melody(config);

if (config.monitors) {
	_.each(config.monitors, function(val, url) {
		new Monitor(url, val, config);
	});
};

process.on('SIGINT', server.close);