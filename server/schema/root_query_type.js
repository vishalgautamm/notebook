const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql
// importing StandupType and NoteType schemas
const StandupType = require('./standup_type')
const NoteType = require('./note_type')

// getting access to our model
const Standup = mongoose.model('standup')
const Note = mongoose.model('note')

// Defining our root Query..

const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		standups: {
			type: new GraphQLList(StandupType),
			resolve() {
				Standup.find({})
			}
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
