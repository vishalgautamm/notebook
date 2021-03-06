import React, { Component } from 'react'
import { Link, hashHistory } from 'react-router'
import Ionicon from 'react-ionicons'
import { graphql } from 'react-apollo'
import query from '../../queries/currentUser'
import mutation from '../../mutations/logout'

class Header extends Component {
	// 094: Automatic Component Rerender by using refetchQueries
	// 094 Explanation - 2 requests: Mutation and query.
	//  one request that will logout representing mutation and as soon as we get the response
	//   - our client will automatically follow up with an addtional query to ask for the current Authentication state of
	//   - the user. And when we finally get the response, we will see the original sign up/login page
	onLogoutClick() {
		return this.props.mutate({
			refetchQueries: [{ query }]
		})
	}

	renderButtons() {
		const { loading, user } = this.props.data
		if (loading) {
			return <div />
		}

		return user ? (
			<div className="Header nav">
				<Link to="/projects/new">
					<Ionicon icon="ion-android-create" color="#8e44ad" />
				</Link>
				<li className="nav-item">
					<p>
						sup' <span className="userName">{user.username} </span>{' '}
					</p>
				</li>

				<li className="nav-item item-2">
					<Link to="/projects">Message Board</Link>
				</li>
				<li className="nav-item item-3">
					<a onClick={this.onLogoutClick.bind(this)}>Logout</a>
				</li>
			</div>
		) : (
			<div className="Header nav">
				<li className="nav-item item-3">
					<Link to="/signup"> Sign up</Link>
				</li>
				<li className="nav-item item-4">
					<Link to="/login"> Sign in</Link>
				</li>
			</div>
		)
	}
	render() {
		return (
			<nav>
				<div className="nav-container">
					<header className="Header nav-wrapper">
						<div className="Header brand-logo">
							<Link to="/"> Notebook </Link>
						</div>

						<ul>{this.renderButtons()}</ul>
					</header>
				</div>
			</nav>
		)
	}
}

export default graphql(mutation)(graphql(query)(Header))
