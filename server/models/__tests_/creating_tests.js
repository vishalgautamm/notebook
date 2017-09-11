const assert = require('assert')
const Standup = require('../Standup')

describe('Creating Standup Meeting records', () => {
	it('Save a topic/standup meeeting doc to the database', done => {
		const react = new Standup({
			memberName: 'John Doe',
			project: 'Getting Started with React JS',
			workYesterday: 'NodeJS and Express',
			workToday: 'Frontend UI with React',
			impediment: 'None'
		})

		react.save().then(() => {
			assert(!react.isNew)
			done()
		})
	})
})
