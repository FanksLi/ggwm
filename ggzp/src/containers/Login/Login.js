import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/action.js'
import { 
	NavBar, 
	WingBlank, 
	WhiteSpace, 
	List, 
	InputItem,
	Toast,
	Button
} from 'antd-mobile'
import Log from '../../components/Log/Log.js'

class Login extends React.Component {
	state = {
		username: '',
		password: '',
	}
	// 提示框
	showToast = () => {
		Toast.info(this.props.msg)
	}
	handleChange = (val) => {
		this.setState({
			type: val
		})
	}
	setDate = (name, val) => {
		this.setState({
			[name]: val
		})
	}
	Submit = async () => {
		await this.props.login(this.state)
		if (this.props.msg) {
			this.showToast()
		}
	}
	handleRegister = () => {
		this.props.history.replace('/register')
	}
	render () {
		const { redirectTo } = this.props
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}
		return (
			<div>
				<NavBar>登录</NavBar>
				<Log />
				<WingBlank>
					<List>
						<InputItem onChange={(val) => this.setDate('username', val)} placeholder='请输入账号'>账号:</InputItem>
						<InputItem type='password' onChange={(val) => this.setDate('password', val)} placeholder='请输入密码'>密码:</InputItem>
						<WhiteSpace />
						<WhiteSpace />
						<Button type='primary' onClick={this.Submit}>登录</Button>
						<WhiteSpace />
						<WhiteSpace />
						<Button onClick={this.handleRegister}>注册账号</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}
export default connect(
	state => state.user,
	{ login }
)(Login)