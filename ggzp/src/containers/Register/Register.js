import React from 'react'
import { Redirect } from 'react-router-dom'
import { 
	NavBar, 
	WingBlank, 
	WhiteSpace, 
	List, 
	InputItem,
	Radio,
	Toast,
	Button
} from 'antd-mobile'

import Log from '../../components/Log/Log.js'
import { connect } from 'react-redux'
import { register } from '../../redux/action.js'

class Register extends React.Component {
	state = {
		username: '',
		password: '',
		password2: '',
		type: 0
	}
	// 提示框
	showToast = () => {
		Toast.info(this.props.msg)
	}
	// 单选按钮变化时间
	handleChange = (val) => {
		this.setState({
			type: val	
		})
	}
	// 绑定数据
	setDate = (name, val) => {
		this.setState({
			[name]: val
		})
	}
	// 注册
	Submit = async () => {
		await this.props.register(this.state)
		if (this.props.msg) {
			this.showToast()
		}
	}
	// 跳转到登录
	handleLogin = () => {
		this.props.history.replace('/login')
	}
	render () {
		const { redirectTo } = this.props
		if (redirectTo) {
			return <Redirect to={redirectTo} />
		}
		return (
			<div>
				<NavBar>注册</NavBar>
				<Log />
				<WingBlank>
					<List>
						<InputItem onChange={(val) => this.setDate('username', val)} placeholder='请输入账号'>账号:</InputItem>
						<InputItem type='password' onChange={(val) => this.setDate('password', val)} placeholder='请输入密码'>密码:</InputItem>
						<InputItem type='password' onChange={(val) => this.setDate('password2', val)} placeholder='请确认密码'>确认密码:</InputItem>,
						<List.Item>
							<span>用户类型:</span>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<Radio checked={this.state.type === 0} onChange={() => this.handleChange(0)}>大神</Radio>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<Radio checked={this.state.type === 1} onChange={() => this.handleChange(1)}>老板</Radio>
						</List.Item>
						<WhiteSpace />
						<Button type='primary' onClick={this.Submit}>注册</Button>
						<WhiteSpace />
						<Button onClick={this.handleLogin}>已经有账号了</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}
export default connect(
	state => state.user,
	{ register }
)(Register)