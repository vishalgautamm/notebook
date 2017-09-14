const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = mongoose.model('user')

// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
	done(null, user.id)
})

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

// Instructs Passport how to authenticate a user using a locally saved email and password combination.
passport.use(
	new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		User.findOne({ email: email.toLowerCase() }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, 'Invalid Credentials')
			}
			user.comparePassword(password, (err, isMatch) => {
				if (err) {
					return done(err)
				}
				if (isMatch) {
					return done(null, user)
				}
				return done(null, false, 'Invalid credentials.')
			})
		})
	})
)

// Creates a new user account.
function signup({ username, email, password, req }) {
	const user = new User({ username, email, password })
	if (!username || !email || !password) {
		throw new Error('You must provide a username, email and password.')
	}

	return User.findOne({ email })
		.then(existingUser => {
			if (existingUser) {
				throw new Error('Email in use')
			}
			return user.save()
		})
		.then(user => {
			return new Promise((resolve, reject) => {
				req.logIn(user, err => {
					if (err) {
						reject(err)
					}
					resolve(user)
				})
			})
		})
}

// Logs in a user.
function login({ email, password, req }) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local', (err, user) => {
			if (!user) {
				reject('Invalid credentials')
			}

			req.login(user, () => resolve(user))
		})({ body: { email, password } })
	})
}

// Logs out a user
const logout = req => {
	const { user } = req
	req.logout()
	return user
}

module.exports = { signup, login, logout }
