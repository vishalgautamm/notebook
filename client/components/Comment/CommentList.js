import './CommentList.css'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { emojify } from 'react-emoji'
import Ionicon from 'react-ionicons'
import likeComment from '../../mutations/likeComment'

class CommentList extends Component {
	componentDidMount() {
		document.title = 'Comments'
	}

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
					<div className="CommentList-Container">
						<p className="CommentList-Content"> {emojify(content)} </p>
						<p className="CommentList-Created">{createdOn} </p>
					</div>
					<div className="CommentList-VoteBox">
						<p className="CommentList-Likes"> {likes} </p>
						<p onClick={() => this.onLike(id, likes)} className="btn-like">
							<Ionicon icon="ion-thumbsup" color="#8e44ad" fontSize="2rem" />
						</p>
					</div>
				</li>
			)
		})
	}

	render() {
		return (
			<div className="CommentList">
				<ul className="CommentList-Collection">{this.renderComments()}</ul>
			</div>
		)
	}
}

export default graphql(likeComment)(CommentList)
