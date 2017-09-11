import React from 'react'
import Header from '../Header/'

const App = ({ children }) => (
	<div className="container">
		<Header />
		{children}
	</div>
)

export default App
