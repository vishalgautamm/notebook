import React, { Component } from 'react'
import SignupFormm from './SignupFormm'
import mutation from '../../mutations/signUp'
import query from '../../queries/currentUser'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import { hashHistory } from 'react-router'

class SignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = { errors: [] }
	}

	componentDidMount() {
		document.title = 'Sign up'
	}

	componentWillUpdate(nextProps) {
		// this.props // the old, current set of props
		// nextProps // the next set of props that will be in place
		// // when the component re-renders
		if (!this.props.data.user && nextProps.data.user) {
			// redirect to dashboard!!
			hashHistory.push('/projects')
		}
	}

	onSubmit({ username, email, password }) {
		this.props
			.mutate({
				variables: { username, email, password },
				refetchQueries: [{ query }]
			})
			.catch(res => {
				const errors = res.graphQLErrors.map(err => err.message)
				this.setState({ errors })
			})
	}

	render() {
		return (
			<div className="Signup-Component">
				<h3 className="Signup-Header">Sign up</h3>
				<Link className="Auth-Message" to="/login">
					{' '}
					Have an account?{' '}
				</Link>
				<SignupFormm
					errors={this.state.errors}
					onSubmit={this.onSubmit.bind(this)}
				/>
			</div>
		)
	}
}

export default graphql(query)(graphql(mutation)(SignupForm))
