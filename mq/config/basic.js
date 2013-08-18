exports.config = {
	port: 5000,
	soundDir: '../sounds/',

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
		siren: {
			type: 'single',
			sound: 'siren.wav'
		},
		toot: {
			type: 'single',
			sound: 'toot.wav'
		},
		alarm: {
			type: 'single',
			sound: 'alarmclock.wav'
		},
		error: {
			type: 'single',
			sound: 'uhoh.wav'
		}
	},

	monitors: {
		'http://localhost:8000': {
			threshold: 5000,
			bad: 'siren.wav',
			good: 'cave.wav'
		}
	}
}