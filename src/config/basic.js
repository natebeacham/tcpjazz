module.exports = {
	port: 5000,
	soundDir: '../sounds/',

	http: {
		port: 5001,
		events: {
			'ping': 'beep1.wav'
		}
	},

	events: {
		ping: {
			type: 'single',
			sound: 'beep1.wav'
		},
		trash: {
			type: 'single',
			sound: 'paper.wav'
		},
		piano: {
			type: 'single',
			sound: 'piano.wav'
		},
		error: {
			type: 'single',
			sound: 'uhoh.wav'
		}
	},

	/*monitors: {
		'http://localhost:8000': {
			threshold: 5000,
			bad: 'thunder.wav',
			good: 'cave.wav'
		}
	}*/
}