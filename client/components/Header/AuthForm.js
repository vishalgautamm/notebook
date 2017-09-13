import './AuthForm.css'
import React, { Component } from 'react'

//  LESSON 96: Auth Form
class AuthForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: ''
		}
	}

	onSubmit(event) {
		event.preventDefault()
		this.props.onSubmit(this.state)
	}
	render() {
		return (
			<div className="row">
				<form onSubmit={this.onSubmit.bind(this)} className="col s6">
					<div className="input-field">
						<input
							placeholder="email"
							value={this.state.email}
							onChange={evt => this.setState({ email: evt.target.value })}
						/>
					</div>
					<div className="input-field">
						<input
							placeholder="password"
							type="password"
							value={this.state.password}
							onChange={evt => this.setState({ password: evt.target.value })}
						/>
					</div>

					{/* Component will show error if user has not logged in */}
					<div className="errors">
						{this.props.errors.map(error => <div key={error}>{error}</div>)}
					</div>

					<button className="btn">Submit</button>
				</form>
			</div>
		)
	}
}

export default AuthForm
