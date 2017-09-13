const mongoose = require('mongoose')
const moment = require('moment')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList
} = require('graphql')
const StandupType = require('./standup_type')
const User = mongoose.model('user')

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: {
		id: { type: GraphQLID },
		email: { type: GraphQLString },
		createdOn: {
			type: GraphQLString,
			resolve: ({ createdOn }) => moment(createdOn).format('MMMM Do YYYY')
		},
		meetings: {
			type: new GraphQLList(StandupType),
			resolve(parentVal) {
				return User.findMeetingNotes(parentVal.id)
			}
		}
	}
})

module.exports = UserType
