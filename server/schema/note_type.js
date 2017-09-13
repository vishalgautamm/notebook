const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql
const moment = require('moment')
const Note = mongoose.model('note')
const timeStamp = require('../utils/')
const NoteType = new GraphQLObjectType({
	name: 'NoteType',
	fields: () => ({
		id: { type: GraphQLID },
		content: { type: GraphQLString },
		likes: { type: GraphQLInt },
		createdOn: {
			type: GraphQLString,
			resolve: ({ createdOn }) => moment(createdOn).format('MMMM Do YYYY')
		},
		standup: {
			type: require('./standup_type'),
			resolve(parentVal) {
				return Note.findById(parentVal)
					.populate('standup')
					.then(note => note.standup)
			}
		}
	})
})

module.exports = NoteType
