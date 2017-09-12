import './ProjectList.css'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
// import { Link } from 'react-router'
import fetchProjects from '../../queries/fetchProjects'

class ProjectList extends Component {
	renderProjects() {
		return this.props.data.standups.map(
			({ id, project, memberName, createdOn }) => {
				return (
					<ul key={id} className="projectlist-item">
						<li className="projectlist-item-project">{project}</li>
						<li className="projectlist-item-memberName">{memberName}</li>
						<li className="projectlist-item-createdOn">{createdOn}</li>
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
				<h1> List of Projects </h1>
				<div className="projectsCollection">{this.renderProjects()}</div>
			</div>
		)
	}
}

export default graphql(fetchProjects)(ProjectList)
