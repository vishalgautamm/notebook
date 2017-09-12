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
						<li className="nav-item selected item-1">
							<Link to="/">Home</Link>
						</li>
						<li className="nav-item item-2">
							<Link to="/projects">Projects</Link>
						</li>
						<li className="nav-item item-3">
							<Link to="/signup"> Sign up</Link>
						</li>
						<li className="nav-item item-4">
							<Link to="/signin"> Sign in</Link>
						</li>
					</ul>
				</header>
			</div>
		)
	}
}

export default Header
