import gql from 'graphql-tag'

export default gql`
	mutation likeComment($id: ID) {
		likeComment(id: $id) {
			id
			likes
		}
	}
`
