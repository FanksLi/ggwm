import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getList } from '../../redux/action.js'
import CardList from '../../components/card-list/card-list.js'

class Boss extends Component {
	componentDidMount () {
		const { _id } = this.props.user
		if(_id){
			this.props.getList(0)
		}
	}
	render () {
		const { _id, type } = this.props.user
		if (!_id || type !== 1 ) {
			return <Redirect to='/' />
		}
		const userList = this.props.userList
		return (
			<div>
				<CardList userList={userList}/>
			</div>
		)
	}
}

export default connect(
	state => state,
	{ getList }
)(Boss)