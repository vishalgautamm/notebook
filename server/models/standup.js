const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Standup Meeting Notes Schema definition.
const StandupSchema = new Schema({
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

// Expose (Export) the model
module.exports = mongoose.model('standup', StandupSchema)
