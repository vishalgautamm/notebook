import './css/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App/App.js'
import Landing from './components/Landing/Landing.js'
import Signin from './components/Header/Signin'
import Signup from './components/Header/Signup'
import requireAuth from './components/requireAuth'
import ProjectList from './components/Message/ProjectList'

import ProjectCreate from './components/Message/ProjectCreate'
import ProjectDetail from './components/Message/ProjectDetail'

/**
 * This allows apollo to send along cookies (user email and password) whenever it makes a query to the backend server.
 * credentials of 'same-origin' mean that you are making requests to the same origin
 * that your browser is currently on
 * Need to pass this to apollo client so that it can get those cookies: via this.props.data
 */
const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin'
	}
})

const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: object => object.id
})

const Root = () => (
	<ApolloProvider client={client}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Landing} />
				<Route path="projects" component={requireAuth(ProjectList)} />
				<Route path="login" component={Signin} />
				<Route path="signup" component={Signup} />
				<Route path="projects/new" component={requireAuth(ProjectCreate)} />
				<Route path="projects/:id" component={requireAuth(ProjectDetail)} />
				<Route path="/dashboard" component={requireAuth(Landing)} />
			</Route>
		</Router>
	</ApolloProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
