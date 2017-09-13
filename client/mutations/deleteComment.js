import gql from 'graphql-tag'

export default gql`
	mutation deleteComment($id: ID) {
		deleteComment(id: $id) {
			id
		}
	}
`
