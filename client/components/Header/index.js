import './Header.css'

import React, { Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
	render() {
		return (
			<header className="Header nav-wrapper">
				<div className="Header brand-logo">
					<Link to="/"> Notebook </Link>
				</div>
				<ul className="Header nav">
					<li className="nav-item selected">
						<Link to="/">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/messages">Messages</Link>
					</li>
					<li className="nav-item">
						<Link to="/"> Sign up</Link>
					</li>
					<li className="nav-item">
						<Link to="/"> Sign in</Link>
					</li>
				</ul>
			</header>
		)
	}
}

export default Header
