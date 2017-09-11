const assert = require('assert')
const Standup = require('../Standup')

describe('Reading posts out of the database', () => {
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
	it('finds all the users with the name of john', done => {
		Standup.find({ memberName: 'John Doe' }).then(users => {
			assert(users[0]._id.toString() === john._id.toString())
			done()
		})
	})

	it('find a user with a particular id', done => {
		Standup.findOne({ _id: john._id }).then(user => {
			assert(user.memberName === 'John Doe')
			done()
		})
	})
})
