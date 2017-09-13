import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import likeComment from '../../mutations/likeComment'

class CommentList extends Component {
	onLike(id, likes) {
		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				__typename: 'Mutataion',
				likeComment: {
					id,
					__typename: 'NoteType',
					likes: likes + 1
				}
			}
		})
	}

	// This function will render all the comments, which is passed from the Project Detail component
	renderComments() {
		return this.props.comments.map(({ id, likes, content, createdOn }) => {
			return (
				<li key={id} className="CommentList-Items">
					{content} - {createdOn}
					<div className="CommentList-VoteBox">
						Likes: {likes}
						<button onClick={() => this.onLike(id, likes)}>Like</button>
					</div>
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

export default graphql(likeComment)(CommentList)
