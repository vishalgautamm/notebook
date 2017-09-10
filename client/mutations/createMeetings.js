import gql from 'graphql-tag'

export default gql`
	mutation newProject(
		$name: String
		$proj: String
		$workYesterday: String
		$workToday: String
		$impediment: String
	) {
		addMeetingNote(
			memberName: $name
			project: $proj
			workYesterday: $workYesterday
			workToday: $workToday
			impediment: $impediment
		) {
			memberName
			createdOn
		}
	}
`
