const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql
// importing StandupType and NoteType schemas
const UserType = require('./user_type')
const StandupType = require('./standup_type')
const NoteType = require('./note_type')

// getting access to our model
const User = mongoose.model('user')
const Standup = mongoose.model('standup')
const Note = mongoose.model('note')

// Defining our root Query..

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		users: {
			type: new GraphQLList(UserType),
			resolve: () => User.find({})
		},
		user: {
			type: UserType,
			resolve: (parentVal, args, req) => req.user
		},
		standups: {
			type: new GraphQLList(StandupType),
			resolve: () => Standup.find({})
		},
		standup: {
			type: StandupType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve: (_, { id }) => Standup.findById(id)
		},
		note: {
			type: NoteType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve: (_, { id }) => Note.findById(id)
		}
	})
})

module.exports = RootQuery
