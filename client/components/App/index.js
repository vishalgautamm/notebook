import './App.css'

import React from 'react'
import Header from '../Header/'
import Footer from '../Footer/'

const App = ({ children }) => (
	<div className="container">
		<Header />
		<div className="Main-body">{children}</div>
		<Footer />
	</div>
)

export default App
