const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')

// Note and Standup Models - Mongo
const Note = mongoose.model('note')
const Standup = mongoose.model('standup')

// Note and Stand Types - GraphQL
const NoteType = require('./note_type')
const StandupType = require('./standup_type')

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addMeetingNote: {
			type: StandupType,
			args: {
				memberName: { type: GraphQLString },
				project: { type: GraphQLString },
				workYesterday: { type: GraphQLString },
				workToday: { type: GraphQLString },
				impediment: { type: GraphQLString }
			},
			resolve(
				parentVal,
				{ memberName, project, workYesterday, workToday, impediment }
			) {
				return new Standup({
					memberName,
					project,
					workYesterday,
					workToday,
					impediment
				}).save()
			}
		}
	}
})

module.exports = mutation
