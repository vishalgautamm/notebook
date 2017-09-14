import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'

import createMeetings from '../../mutations/createMeetings'
import fetchProjects from '../../queries/fetchProjects'

class ProjectCreate extends Component {
	constructor(props) {
		super(props)

		this.state = {
			memberName: '',
			project: '',
			workYesterday: '',
			workToday: '',
			impediment: ''
		}
	}

	onSubmit(event) {
		event.preventDefault()

		this.props
			.mutate({
				variables: {
					memberName: this.state.memberName,
					project: this.state.project,
					workYesterday: this.state.workYesterday,
					workToday: this.state.workToday,
					impediment: this.state.impediment
				},
				refetchQueries: [{ query: fetchProjects }]
			})
			.then(() => hashHistory.push('/projects/'))
			.catch(() => console.warn('Error occured while fetching data'))
	}

	render() {
		return (
			<div className="projectCreate">
				<form
					className="projectCreate-input"
					onSubmit={this.onSubmit.bind(this)}
				>
					<input
						required
						placeholder="Name"
						value={this.state.memberName}
						onChange={event =>
							this.setState({ memberName: event.target.value })}
					/>

					<input
						required
						placeholder="Project"
						value={this.state.project}
						onChange={event => this.setState({ project: event.target.value })}
					/>

					<input
						required
						placeholder="Work Yesterday"
						value={this.state.workYesterday}
						onChange={event =>
							this.setState({ workYesterday: event.target.value })}
					/>

					<input
						required
						placeholder="Work Today"
						value={this.state.workToday}
						onChange={event => this.setState({ workToday: event.target.value })}
					/>

					<textarea
						required
						type="text"
						placeholder="Impediment (in markdown)"
						value={this.state.impediment}
						onChange={event =>
							this.setState({ impediment: event.target.value })}
					/>
					<button className="btn-success">Submit</button>
				</form>
			</div>
		)
	}
}

export default graphql(createMeetings)(ProjectCreate)
