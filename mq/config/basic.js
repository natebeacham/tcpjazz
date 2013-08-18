exports.config = {
	port: 5000,
	soundDir: '../sounds/',

	events: {
		ping: {
			type: 'single',
			sound: 'ding.wav'
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
		}
	}
}