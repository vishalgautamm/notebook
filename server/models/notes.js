const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Defining Notes schema...
const NotesSchema = new Schema({
	standup: {
		type: Schema.Types.ObjectId,
		ref: 'standup'
	},
	content: { type: String },
	likes: { type: Number, default: 0 },
	createdOn: { type: Date, default: Date.now }
})

// Fetures
// Users can like, dislike, update and delete comments (CRUD)

NotesSchema.statics.like = function(id) {
	const Note = mongoose.model('note')
	return Note.findById(id).then(note => {
		++note.likes
		return note.save()
	})
}

NotesSchema.statics.dislike = function(id) {
	const Note = mongoose.model('note')
	return Note.findById(id).then(note => {
		--note.likes
		return note.save()
	})
}

NotesSchema.statics.updateComment = function(id, content) {
	const Note = mongoose.model('note')
	return Note.findById(id).then(note => {
		note.content = content
		return note.save()
	})
}

module.exports = mongoose.model('note', NotesSchema)
