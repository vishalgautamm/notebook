import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import fetchProjects from '../../queries/fetchProjects'
import deleteMessage from '../../mutations/deleteMessage'

class ProjectList extends Component {
	onDelete(id) {
		this.props
			.mutate({
				variables: { id }
			})
			.then(() => this.props.data.refetch())
	}
	renderProjects() {
		return this.props.data.standups.map(
			({ id, project, memberName, createdOn }) => {
				return (
					<ul key={id} className="projectlist-item">
						<li className="projectlist-item-title">
							<h1>
								<Link to={`/projects/${id}`}>{project}</Link>
							</h1>
						</li>
						<li className="projectlist-item-author">{memberName}</li>
						<li className="projectlist-item-createdOn">{createdOn}</li>
						<button onClick={() => this.onDelete(id)}>Delete</button>
					</ul>
				)
			}
		)
	}
	render() {
		if (this.props.data.loading) {
			return <h1> Data Loading...... </h1>
		}
		return (
			<div className="projectlist">
				<div className="projectsCollection">{this.renderProjects()}</div>
				<Link to="/projects/new"> Add a new Project </Link>
			</div>
		)
	}
}

export default graphql(deleteMessage)(graphql(fetchProjects)(ProjectList))
