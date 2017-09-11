const assert = require('assert')
const Standup = require('../Standup')

describe('Updating standup records ', () => {
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

	const assertName = (operation, done) =>
		operation.then(() => Standup.find({})).then(users => {
			assert(users.length === 1)
			assert(users[0].memberName === 'Petyr Baelish')
			done()
		})

	it('updates a model instance using setAndSave', done => {
		john.set('memberName', 'Petyr Baelish')
		assertName(john.save(), done)
	})

	it('updates a model instance using update', done => {
		assertName(john.update({ memberName: 'Petyr Baelish' }), done)
	})

	it('updates a model Class  using setAndSave', done => {
		assertName(
			Standup.update(
				{ memberName: 'John Doe' },
				{ memberName: 'Petyr Baelish' }
			),
			done
		)
	})

	it('A model Class can update one record', done => {
		assertName(
			Standup.findOneAndUpdate(
				{ memberName: 'John Doe' },
				{ memberName: 'Petyr Baelish' }
			),
			done
		)
	})

	it('A model class can find a record with an Id and Update', done => {
		assertName(
			Standup.findByIdAndUpdate(john._id, { memberName: 'Petyr Baelish' }),
			done
		)
	})
})
