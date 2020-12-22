import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { getList } from '../../redux/action.js'
import CardList from '../../components/card-list/card-list.js'

class Jober extends Component {
	componentDidMount () {
		const { type, _id } = this.props.user
		if(_id){
			this.props.getList(1)
		}
	}
	render () {
		const { _id, type } = this.props.user
		if (!_id || type !== 0 ) {
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
)(Jober)