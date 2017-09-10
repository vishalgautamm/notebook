const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const NoteType = require('./note_type')
const Standup = mongoose.model('standup')
const timeStamp = require('../utils/')

const StandupType = new GraphQLObjectType({
	name: 'StandupType',
	fields: () => ({
		id: { type: GraphQLID },
		memberName: { type: GraphQLString },
		project: { type: GraphQLString },
		workYesterday: { type: GraphQLString },
		workToday: { type: GraphQLString },
		impediment: { type: GraphQLString },
		createdOn: {
			type: GraphQLString,
			resolve: ({ createdOn }) => timeStamp(createdOn)
		},
		notes: {
			// TO-DO: Need to define NoteType
			type: new GraphQLList(NoteType),
			resolve(parentVal) {
				return Standup.findNotes(parentVal.id)
			}
		}
	})
})

module.exports = StandupType
