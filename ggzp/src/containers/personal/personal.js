import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { registerInfo } from '../../redux/action.js'

import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
const Item = List.Item
class Personal extends Component {
	handleClick = () => {
		Modal.alert('警告', '你确定退出登录吗？', [
			{ text: '取消'},
			{ text: '确认', onPress: () => {
				Cookies.remove('id')
				this.props.registerInfo()
			}}
		])
	}
	render () {
		const {username, info, post, salary, company, header} = this.props.user
		const myImg = src => <img src={src} />
		return (
			<div className='personal'>
				<Result
					img={myImg(header)}
					title={username}
					message={company ? company : null}
				 />
				 <WhiteSpace />
				 <List renderHeader={() => '相关信息'}>
					<Item multipleLine>
						<div style={{marginTop: 10}}>职位: {post}</div>
						{salary ? <div style={{marginTop: 10}}>薪资: {salary}</div> : null}
						<div style={{marginTop: 10}}>介绍: {info}</div>
					</Item>
				 </List>
				 <WhiteSpace />
				 <Button type='warning' onClick={this.handleClick}>退出登录</Button>
			</div>
		)
	}
}

export default connect(
	state => ({user: state.user}),
	{ registerInfo }
)(Personal)