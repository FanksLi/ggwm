import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
export default class CardList extends Component {
	static propTypes = {
		userList: PropTypes.array
	}
	render () {
		const userList = this.props.userList
		return (
			<div className='card-list'>
				{userList.map((val, index) => (
					<div key={index}>
						<WingBlank>
						<WhiteSpace />
						<Card>
							<Card.Header
								title={val.username}
								thumb={val.header}
							></Card.Header>
							<Card.Body>
								<div style={{marginTop: 10}}>职位:{val.post}</div>
								{val.company ? <div style={{marginTop: 10}}>公司:{val.company}</div> : null }
								{val.salary ? <div style={{marginTop: 10}}>月薪:{val.salary}</div> : null }
								<div style={{marginTop: 10}}>描述:{val.info}</div>
							</Card.Body>
						</Card>
						</WingBlank>
					</div>
				))	}
			</div>
		)
	}
}