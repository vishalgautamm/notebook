const Note = require('../Notes')
const assert = require('assert')
// Creating a comment test
describe('Creating comment records', () => {
	it('Save a comment doc to the database', done => {
		const sample = new Note({
			content: 'This is a new sample comment'
		})

		sample.save().then(() => {
			assert(!sample.isNew)
			done()
		})
	})
})
