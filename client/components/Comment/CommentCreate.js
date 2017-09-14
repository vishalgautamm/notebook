import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import createComment from '../../mutations/createComment'

function validate(comment) {
	// true means invalid, so our conditions got reversed
	return {
		content: comment.length < 10
	}
}

class CommentCreate extends Component {
	constructor(props) {
		super(props)

		this.state = { content: '' }
	}

	onSubmit(event) {
		event.preventDefault()
		this.props
			.mutate({
				variables: {
					messageId: this.props.messageId,
					content: this.state.content
				}
			})
			.then(() => this.setState({ content: '' }))
	}

	render() {
		return (
			<div className="CommentCreate">
				<form onSubmit={this.onSubmit.bind(this)}>
					<input
						required
						placeholder="Add a comment"
						value={this.state.content}
						onChange={e => this.setState({ content: e.target.value })}
					/>
				</form>
			</div>
		)
	}
}

export default graphql(createComment)(CommentCreate)
