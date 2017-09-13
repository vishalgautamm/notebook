import React from 'react'
import ReactDOM from 'react-dom'
import Signin from './Signin'

it('renders Signin Component without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<Signin />, div)
})
