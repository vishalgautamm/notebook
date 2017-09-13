import React, { Component } from 'react'
import query from '../queries/currentUser'
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router'

export default WrappedComponent => {
	class RequireAuth extends Component {
		// componentDidMount() Dont use componentDidMount, instead use componentWillUpdate
		componentWillUpdate(nextProps) {
			const { user, loading } = nextProps.data
			if (!user && !loading) {
				hashHistory.push('/login')
			}
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}

	return graphql(query)(RequireAuth)
}
