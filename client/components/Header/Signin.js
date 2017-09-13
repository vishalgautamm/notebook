import React, { Component } from 'react'
import AuthForm from './AuthForm'
import mutation from '../../mutations/login'
import query from '../../queries/currentUser'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

// Lesson 99: Refetching Queries
class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = { errors: [] }
	}

	componentWillUpdate(nextProps) {
		// this.props // the old, current set of props
		// nextProps // the next set of props that will be in place
		// // when the component re-renders
		// console.log(this.props, nextProps)
		if (!this.props.data.user && nextProps.data.user) {
			// redirect to dashboard!!
			hashHistory.push('/projects')
		}
	}

	onSubmit({ email, password }) {
		this.props
			.mutate({
				variables: { email, password },
				refetchQueries: [{ query }]
			})
			.catch(res => {
				const errors = res.graphQLErrors.map(err => err.message)
				this.setState({ errors })
			})

		// Lesson 100: Error handling with GraphQL
	}
	render() {
		return (
			<div className="Signin-Component">
				<h3 className="Signin-Header">Login</h3>
				<Link className="Auth-Message" to="/signup">
					{' '}
					Need an Account?{' '}
				</Link>
				<AuthForm
					errors={this.state.errors}
					onSubmit={this.onSubmit.bind(this)}
				/>
			</div>
		)
	}
}

export default graphql(query)(graphql(mutation)(LoginForm))
