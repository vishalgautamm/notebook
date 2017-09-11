import './Landing.css'

import React from 'react'
import { Link } from 'react-router'

const Landing = () => (
	<div className="Landing-Main">
		<h1 className="Landing-Main-logo"> Notebook </h1>
		<p className="Landing-Main-message">
			{' '}
			Notebook is a modern productivity tool that enables you to easily create
			and share your project notes with your co-workers {' '}
		</p>
		<button className="Landing-Main-Button">
			<Link className="btn" to={'/signup'}>
				Get Started
			</Link>
		</button>
	</div>
)

export default Landing
