import './Header.css'

import React, { Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
	render() {
		return (
			<div className="nav-container">
				<header className="Header nav-wrapper">
					<div className="Header brand-logo">
						<Link to="/"> Notebook </Link>
					</div>
					<ul className="Header nav">
						<li className="nav-item selected">
							<Link to="/">Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/projects">Projects</Link>
						</li>
						<li className="nav-item">
							<Link to="/signup"> Sign up</Link>
						</li>
						<li className="nav-item">
							<Link to="/signin"> Sign in</Link>
						</li>
					</ul>
				</header>
			</div>
		)
	}
}

export default Header
