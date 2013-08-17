exports.config = {
	port: 5000,
	soundDir: '../sounds/',

	events: {
		ping: {
			type: 'single',
			sound: 'ding.wav'
		}
	}
}