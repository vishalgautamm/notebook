const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql
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
			resolve: ({ createdOn }) => timeStamp(createdOn)
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
