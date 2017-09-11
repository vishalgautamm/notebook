const Note = require('../Notes')
const assert = require('assert')

// TO DO: 6 TESTS
// - Need to implement the following tests:
// - Creating a new comment (DONE)
// - reading every comments (DONE)
// - Reading comment by id
// - Deleting comment by id
// - Deleting entire thread of comments
// - Updating a comment

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

// Reading a comment test
describe('Reading comments out of the database', () => {
	let sample
	beforeEach(done => {
		sample = new Note({
			content: 'Hello World'
		})
		sample.save().then(() => done())
	})
	it('finds all the comments', done => {
		Note.find({ content: 'Hello World' }).then(result => {
			assert(result[0]._id.toString() === sample._id.toString())
			done()
		})
	})
})
