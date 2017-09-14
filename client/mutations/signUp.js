import gql from 'graphql-tag'

export default gql`
	mutation addUser($username: String, $email: String, $password: String) {
		signup(username: $username, email: $email, password: $password) {
			id
			username
			email
			createdOn
		}
	}
`
