import './Landing.css'

import React from 'react'
import { Link } from 'react-router'

const Landing = () => (
	<div className="Landing-Main">
		<h1 className="Landing-Main-logo"> Notebook </h1>
		<p className="Landing-Main-message">
			{' '}
			A modern productivity tool for your needs{' '}
		</p>
		<button className="Landing-Main-Button">
			<Link to={'/messages'}>Get Started</Link>
		</button>
	</div>
)

export default Landing
