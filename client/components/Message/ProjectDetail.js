import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'

import CommentList from '../Comment/CommentList'
import CommentCreate from '../Comment/CommentCreate'

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
				<br />
				<ReactMarkdown
					className="projectDetail-impediments"
					source={standup.impediment}
				/>

				<div className="project-Comments">
					<CommentList comments={standup.notes} />
				</div>
				<CommentCreate messageId={this.props.params.id} />
			</div>
		)
	}
}

export default graphql(fetchProjectById, {
	options: props => ({ variables: { id: props.params.id } })
})(ProjectDetail)
