import gql from 'graphql-tag'

export default gql`
	query getProjects {
		standups {
			id
			project
			memberName
			createdOn
		}
	}
`
