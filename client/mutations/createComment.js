import gql from 'graphql-tag'

export default gql`
	mutation addComment($content: String, $messageId: ID!) {
		addNoteToMeetingNote(content: $content, messageId: $messageId) {
			id
		}
	}
`
