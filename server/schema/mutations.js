const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')
const AuthService = require('../services/auth')

// Note and Standup Models - Mongo
const Note = mongoose.model('note')
const Standup = mongoose.model('standup')
const User = mongoose.model('user')

// Note and Stand Types - GraphQL
const UserType = require('./user_type')
const NoteType = require('./note_type')
const StandupType = require('./standup_type')

// TO DO: Need to implement the following mutation features:
// -- addMeetingNote (DONE)
// -- addCommentToMessages (DONE)
// -- likeComment (DONE)
// -- dislikeComment
// -- deleteComment (DONE)
// -- deleteMessage

// TO DO: Future: May be add delete comment as well

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentVal, { email, password }, req) {
				return AuthService.signup({ email, password, req })
			}
		},
		logout: {
			type: UserType,
			resolve(parentVal, args, req) {
				return AuthService.logout(req)
			}
		},

		login: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentVal, { email, password }, req) {
				return AuthService.login({ email, password, req })
			}
		},

		// Users can add standUp meeting notes
		addStandUpMeetingNote: {
			type: UserType,
			args: {
				memberName: { type: GraphQLString },
				project: { type: GraphQLString },
				workYesterday: { type: GraphQLString },
				workToday: { type: GraphQLString },
				impediment: { type: GraphQLString },
				messageId: { type: GraphQLID }
			},
			resolve: (
				_,
				{ memberName, project, workYesterday, workToday, impediment, messageId }
			) =>
				User.addMeeting(
					messageId,
					memberName,
					project,
					workYesterday,
					workToday,
					impediment,
					messageId
				)
		},
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
		},

		// Users can dislike comments that they / others posted
		dislikeComment: {
			type: NoteType,
			args: { id: { type: GraphQLID } },
			resolve: (_, { id }) => Note.dislike(id)
		},
		// Users can delete their own comments
		deleteComment: {
			type: NoteType,
			args: { id: { type: GraphQLID } },
			resolve: (_, { id }) => Note.remove({ _id: id })
		},

		// Users can delete their messages
		deleteMessage: {
			type: StandupType,
			args: { id: { type: GraphQLID } },
			resolve: (_, { id }) => Standup.remove({ _id: id })
		},

		// Users can update/edit their comment
		updateComment: {
			type: NoteType,
			args: {
				id: { type: GraphQLID },
				content: { type: GraphQLString }
			},
			resolve: (_, { id, content }) => Note.updateComment(id, content)
		},

		// Users can update/edit their project name
		updateProject: {
			type: StandupType,
			args: {
				id: { type: GraphQLID },
				title: { type: GraphQLString }
			},
			resolve: (_, { id, title }) => Standup.updateMessage(id, title)
		}
	}
})

module.exports = mutation
