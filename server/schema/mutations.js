const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')

// Note and Standup Models - Mongo
const Note = mongoose.model('note')
const Standup = mongoose.model('standup')

// Note and Stand Types - GraphQL
const NoteType = require('./note_type')
const StandupType = require('./standup_type')

// TO DO: Need to implement the following mutation features:
// -- addMeetingNote (DONE)
// -- addCommentToMessages (DONE)
// -- likeComment and
// -- deleteMessage

// TO DO: Future: May be add delete comment as well

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// Users can create their own meeting note
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
		},
		// Users can add comments/notes to meetingNotes
		addNoteToMeetingNote: {
			type: StandupType,
			args: {
				content: { type: GraphQLString },
				messageId: { type: GraphQLID }
			},
			resolve: (_, { content, messageId }) =>
				Standup.addNote(messageId, content)
		},
		// Users can like comments that they / others posted
		likeComment: {
			type: NoteType,
			args: { id: { type: GraphQLID } },
			resolve: (_, { id }) => Note.like(id)
		}
	}
})

module.exports = mutation
