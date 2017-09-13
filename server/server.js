const express = require('express')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Authentication Libs
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./services/auth')
const MongoStore = require('connect-mongo')(session)

const schema = require('./schema/schema')
const keys = require('./config/keys')

const app = express()

// Import mongoURI
const mongoURI = keys.mongoURI
if (!mongoURI) {
	throw new Error(' Must provide a valid mongoURI ')
}

// connect to Mongoose
mongoose.Promise = global.Promise
mongoose.connect(mongoURI)
mongoose.connection
	.once('open', () => console.log('Connected to MongoLab instance.'))
	.on('error', error => console.log('Error connecting to MongoLab:', error))

// Use bodyParser Middleware
app.use(bodyParser.json())

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: 'aaabbbccc',
		store: new MongoStore({
			url: mongoURI,
			autoReconnect: true
		})
	})
)

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize())
app.use(passport.session())

// Use GraphQL Middleware and set graphql to true
app.use(
	'/graphql',
	expressGraphQL({
		schema,
		graphiql: true
	})
)

// make use of webpack middleware
const webpackMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config.js')
app.use(webpackMiddleware(webpack(webpackConfig)))

module.exports = app
