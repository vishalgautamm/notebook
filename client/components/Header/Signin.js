import './Signin.css'

import React from 'react'
import { Link } from 'react-router'

const Signin = () => (
	<div className="Signin-Component">
		<h1 className="Signin-Header"> Sign In </h1>
		<Link to="/signup"> Have an account? </Link>
	</div>
)

export default Signin
