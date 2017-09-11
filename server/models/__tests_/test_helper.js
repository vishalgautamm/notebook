const mongoose = require('mongoose')
// const mongoURI = require('../../config/dev').mongoURI

const mongoURI = 'mongodb://localhost/virtualstanduptest'

mongoose.Promise = global.Promise
before(done => {
	mongoose.connect(mongoURI)
	mongoose.connection
		.once('open', () => done())
		.on('error', err => console.warn('Error: ', err))
})

// This will drop all the Message collections before the test runs
beforeEach(done => {
	mongoose.connection.collections.standups.drop(() => {
		// you can now run the next test
		done()
	})
})

// This will drop all the comment/note collection before the test runs
beforeEach(done => {
	mongoose.connection.collections.notes.drop(() => {
		// you can now run the next test
		done()
	})
})
