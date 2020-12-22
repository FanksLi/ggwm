
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updata } from '../../redux/action.js'
import { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar.js'

class joberInfo extends Component {
	state = {
		header: '', // 头像名称
		info: '', // 个人介绍
		post: '', // 求职岗位
		isShow: false
	}
	// 显示或隐藏头像选择
	show = () => {
		this.setState({
			isShow: !this.state.isShow
		})
	}
	// 获取头像
	getAvatar = (url, type) => {
		if (url){
			const img = url.icon
			this.setState({
				header: img
			})
		}
		this.setState({
			isShow: type
		})
	}
	handleChange = (val, name) => {
		this.setState({
			[name]: val
		})
	}
	// 提交按钮
	subMit = () => {
		this.props.updata(this.state)
	}
	render () {
		const {type, header} = this.props.user
		console.log(this.props.user)
		if (header) {
			const path = type === 0 ? '/jober' : '/boss'
			return <Redirect to={path} />
		}
		return (
			<div>
			<NavBar>jober</NavBar>
				<WingBlank>
					<div className='avatar_img' onClick={this.show}>
						<i className={this.state.header ? 'none' : 'black'}>点击设置头像</i>
						<img className={this.state.header ? 'black' : 'none'} src={this.state.header} />
					</div>
					<Avatar isShow={this.state.isShow || false} getAvatar={this.getAvatar}/>
					<WhiteSpace />
					<List>
						<InputItem placeholder="请输入你的求职岗位" clear onChange={(val) => this.handleChange(val, 'post')}>职位名称:</InputItem>
						<TextareaItem placeholder="说点什么..." clear title='职位介绍:' rows={5} onChange={(val) => this.handleChange(val, 'info')}></TextareaItem>
						<WhiteSpace />
						<Button type='primary' onClick={this.subMit}>提交</Button>
					</List>
				</WingBlank>
			</div>
		)
	}
}
export default connect(
	state => state,
	{ updata }
)(joberInfo)