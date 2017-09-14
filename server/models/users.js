const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const UserSchema = new Schema({
	username: String,
	email: String,
	password: String,
	createdOn: { type: Date, default: Date.now },
	standups: [
		{
			type: Schema.Types.ObjectId,
			ref: 'standup'
		}
	]
})

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.
UserSchema.pre('save', function save(next) {
	const user = this
	if (!user.isModified('password')) {
		return next()
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err)
			}
			user.password = hash
			next()
		})
	})
})

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.
UserSchema.methods.comparePassword = function comparePassword(
	candidatePassword,
	cb
) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		cb(err, isMatch)
	})
}

// memberName: String,
// project: String,
// workYesterday: String,
// workToday: String,
// impediment: String,

// User Schema will be able to add Meeting Notes
UserSchema.statics.addMeeting = function(
	id,
	memberName,
	project,
	workYesterday,
	workToday,
	impediment
) {
	const Standup = mongoose.model('standup')

	return this.findById(id).then(user => {
		const standupMeetingNote = new Standup({
			memberName,
			project,
			workYesterday,
			workToday,
			impediment,
			user
		})
		user.standups.push(standupMeetingNote)
		return Promise.all([standupMeetingNote.save(), user.save()]).then(
			([standupMeetingNote, user]) => user
		)
	})
}

// Query all the meeting notes
UserSchema.statics.findMeetingNotes = function(id) {
	return this.findById(id)
		.populate('standups')
		.then(user => user.standups)
}

mongoose.model('user', UserSchema)
