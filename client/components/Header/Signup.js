import React from 'react'
import { Link } from 'react-router'

const Signup = () => (
	<div className="Signup-Component">
		<h1 className="Signup-Header"> Sign up </h1>
		<Link to="/signin"> Need an account? </Link>
	</div>
)

export default Signup
