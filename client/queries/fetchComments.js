import gql from 'graphql-tag'

export default gql`
	query fetchComments {
		note {
			id
			content
			likes
			likes
		}
	}
`
