import React, { Component } from 'react'
import Ionicon from 'react-ionicons'
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
					<div className="projectlist-item" key={id}>
						<ul>
							<li className="projectlist-item-title">
								<h1>
									<Link to={`/projects/${id}`}>{project}</Link>
								</h1>
							</li>
							<li className="projectlist-item-author">{memberName}</li>
							<li className="projectlist-item-createdOn">{createdOn}</li>
							<li className="projectList-item-readmore">
								<Link to={`/projects/${id}`}>Read more...</Link>
							</li>
						</ul>
						<ul>
							<li
								className="projectlist-item-tarsh"
								onClick={() => this.onDelete(id)}
							>
								<Ionicon
									icon="ion-android-delete"
									color="#8e44ad"
									fontSize="2rem"
								/>
							</li>
						</ul>
					</div>
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
				<div className="projectlist-Header">
					<h3>Global Feed</h3>
				</div>
				<div className="projectsCollection">
					{this.renderProjects()}
					<Link to="/projects/new">
						<button className="btn-success">New Message</button>{' '}
					</Link>
				</div>
			</div>
		)
	}
}

export default graphql(deleteMessage)(graphql(fetchProjects)(ProjectList))
