import React from 'react'
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'

const App = ({ children }) => (
	<div className="container">
		<Header />
		<div className="Main-body">{children}</div>
		<Footer />
	</div>
)

export default App
