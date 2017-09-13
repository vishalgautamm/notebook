import React from 'react'
import ReactDOM from 'react-dom'
import ProjectCreate from './ProjectCreate'

it('renders Message Create Component without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(<ProjectCreate />, div)
})
