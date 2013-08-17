var sys 	= require('sys'),
	http 	= require('http'),
	fs 		= require('fs'),
	url		= require('url'),
	exec	= require('child_process').exec;

var events = {
	'get': 'sounds/ding.wav'
};

http.createServer(function(request, response){  
	var params = url.parse(request.url, true).query;

	if (params.e && params.e in events) {
		exec('play ' + events[params.e]);
	}

	response.writeHeader(200);
	response.end();
	
}).listen(5000);