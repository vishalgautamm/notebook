import React from 'react'
import { Link } from 'react-router'

const Landing = () => (
	<div className="Landing-Container">
		<div className="Landing-Main">
			<h1 className="Landing-Main-logo"> Notebook </h1>
			<p className="Landing-Main-message">
				{' '}
				Notebook is a modern productivity tool that enables you to easily create
				and share meeting notes with your co-workers {' '}
			</p>

			<Link className="Landing-Main-Button" to={'/signup'}>
				<button className="btn">Get Started</button>
			</Link>
		</div>
	</div>
)

export default Landing
