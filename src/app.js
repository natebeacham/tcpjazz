var _ = require('underscore');

var config = require('./config/basic');
var Jazz = require('./jazz');
var HttpJazz = require('./httpjazz');
var Monitor = require('./monitor');

var server = new Jazz(config);

if (config.http) {
	new HttpJazz(config);
};

if (config.monitors) {
	_.each(config.monitors, function(val, url) {
		new Monitor(url, val, config);
	});
};

process.on('SIGINT', server.close);