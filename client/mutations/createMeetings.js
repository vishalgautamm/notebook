import gql from 'graphql-tag'

export default gql`
	mutation newProject(
		$memberName: String
		$project: String
		$workYesterday: String
		$workToday: String
		$impediment: String
	) {
		addMeetingNote(
			memberName: $memberName
			project: $project
			workYesterday: $workYesterday
			workToday: $workToday
			impediment: $impediment
		) {
			memberName
			createdOn
		}
	}
`
