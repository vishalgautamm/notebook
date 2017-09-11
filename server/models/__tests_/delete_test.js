const assert = require('assert')
const Standup = require('../Standup')

describe('Delete a standup post', () => {
	// inside beforeEach, create a new instance of Standup and save it as john,
	// this will be used to test delete tests
	let john

	beforeEach(done => {
		john = new Standup({
			memberName: 'John Doe',
			project: 'Getting Started with React JS',
			workYesterday: 'NodeJS and Express',
			workToday: 'Frontend UI with React',
			impediment: 'None'
		})
		john.save().then(() => done())
	})

	it('model instance remove', done => {
		john
			.remove()
			.then(() => Standup.findOne({ memberName: 'John Doe' }))
			.then(user => {
				assert(user === null)
				done()
			})
	})

	it('class method remove', done => {
		// remove a bunch of records with some given criteria
		Standup.remove({ memberName: 'John Doe' })
			.then(() => Standup.findOne({ memberName: 'John Doe' }))
			.then(user => {
				assert(user === null)
				done()
			})
	})

	it('class method find and remove', () => {})

	it('class method findById and remove', () => {})
})
