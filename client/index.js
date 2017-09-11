import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import App from './components/App/'
import Landing from './components/Landing/'
import Signin from './components/Header/Signin'
import Signup from './components/Header/Signup'
import Messages from './components/Message/Messages'

import NewMessage from './components/Message/NewMessage'

const client = new ApolloClient({
	dataIdFromObject: object => object.id
})

const Root = () => (
	<ApolloProvider client={client}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Landing} />
				<Route path="messages" component={Messages} />
				<Route path="signin" component={Signin} />
				<Route path="signup" component={Signup} />
				<Route path="messages/new" component={NewMessage} />
			</Route>
		</Router>
	</ApolloProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))
