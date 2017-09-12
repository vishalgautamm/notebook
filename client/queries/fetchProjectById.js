import gql from 'graphql-tag'

export default gql`
	query getProjectById($id: ID!) {
		standup(id: $id) {
			id
			memberName
			project
			workYesterday
			workToday
			impediment
			createdOn
			notes {
				id
				content
				likes
				createdOn
			}
		}
	}
`
