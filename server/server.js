const express = require('express')

const expressGraphQL = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const models = require('./models')
const schema = require('./schema/schema')
const keys = require('./config/keys')

const app = express()

// Import mongoURI
const mongoURI = keys.mongoURI
if (!mongoURI) {
	throw new Error(' Must provide a valid mongoURI ')
}

// connect to Mongoose
mongoose.connect(mongoURI)
mongoose.connection
	.once('open', () => console.log('Connected to MongoLab instance.'))
	.on('error', error => console.log('Error connecting to MongoLab:', error))

// Use bodyParser Middleware
app.use(bodyParser.json())

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
