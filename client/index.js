import './css/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App/App.js'
import Landing from './components/Landing/Landing.js'
import Signin from './components/Header/Signin'
import Signup from './components/Header/Signup'
import ProjectList from './components/Message/ProjectList'

import ProjectCreate from './components/Message/ProjectCreate'
import ProjectDetail from './components/Message/ProjectDetail'

const client = new ApolloClient({
	dataIdFromObject: object => object.id
})

const Root = () => (
	<ApolloProvider client={client}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Landing} />
				<Route path="projects" component={ProjectList} />
				<Route path="signin" component={Signin} />
				<Route path="signup" component={Signup} />
				<Route path="projects/new" component={ProjectCreate} />
				<Route path="projects/:id" component={ProjectDetail} />
			</Route>
		</Router>
	</ApolloProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
