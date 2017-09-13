import gql from 'graphql-tag'

export default gql`
	mutation deleteProject($id: ID) {
		deleteMessage(id: $id) {
			id
		}
	}
`
