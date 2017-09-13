import React, { Component } from 'react'

class CommentList extends Component {
	// This function will render all the comments, which is passed from the Project Detail component
	renderComments() {
		return this.props.comments.map(({ id, likes, content, createdOn }) => {
			return (
				<li key={id} className="CommentList-Items">
					{content} - {createdOn}
					<div className="CommentList-VoteBox">Likes: {likes}</div>
				</li>
			)
		})
	}

	render() {
		return (
			<div className="CommentList">
				<p> Comments List </p>
				<ul className="CommentList-Collection">{this.renderComments()}</ul>
			</div>
		)
	}
}

export default CommentList
