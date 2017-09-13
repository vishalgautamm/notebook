const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Standup Meeting Notes Schema definition.
const StandupSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	memberName: String,
	project: String,
	workYesterday: String,
	workToday: String,
	impediment: String,
	createdOn: { type: Date, default: Date.now },
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'note'
		}
	]
})

StandupSchema.statics.addNote = function(id, content) {
	const Note = mongoose.model('note')

	return this.findById(id).then(standup => {
		const note = new Note({ content, standup })
		standup.notes.push(note)
		return Promise.all([note.save(), standup.save()]).then(
			([note, standup]) => standup
		)
	})
}

StandupSchema.statics.findNotes = function(id) {
	return this.findById(id)
		.populate('notes')
		.then(standup => standup.notes)
}

// Update messages
StandupSchema.statics.updateMessage = function(id, updatedTitle) {
	const Standup = mongoose.model('standup')
	return Standup.findById(id).then(message => {
		message.project = updatedTitle
		return message.save()
	})
}

// Expose (Export) the model
const Standup = mongoose.model('standup', StandupSchema)
module.exports = Standup
