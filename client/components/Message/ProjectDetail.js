import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import { emojify } from 'react-emojione'

import CommentList from '../Comment/CommentList'

import fetchProjectById from '../../queries/fetchProjectById'

class ProjectDetail extends Component {
	render() {
		const { standup } = this.props.data

		return !standup ? (
			<div />
		) : (
			<div className="projectDetail">
				<Link className="projectDetail-backButton" to="/projects">
					{' '}
					Back{' '}
				</Link>

				<h2>{standup.project}</h2>
				<p className="projectDetail-author">{standup.memberName}</p>
				<p>Work Today: {standup.workToday}</p>
				<p> Work Yesterday: {standup.workYesterday} </p>
				<p className="projectDetail-impediments">
					impediments: {emojify(standup.impediment)}
				</p>

				<div className="project-Comments">
					<CommentList comments={standup.notes} />
				</div>
			</div>
		)
	}
}

export default graphql(fetchProjectById, {
	options: props => ({ variables: { id: props.params.id } })
})(ProjectDetail)
