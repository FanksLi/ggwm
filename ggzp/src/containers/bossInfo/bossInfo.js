import React, { Component } from 'react'
import { NavBar, List, InputItem, TextareaItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { updata } from '../../redux/action.js'
import Avatar from '../../components/Avatar/Avatar.js'

class bossInfo extends Component {
	state = {
		header: '', // 头像名称
		info: '', // 职位简介
		post: '', // 职位名称
		company: '', // 公司名称
		salary: '', // 工资
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
		if (header) {
			const path = type === 0 ? '/jober' : '/boss'
			return <Redirect to='/' />
		}
		return (
			<div>
			<NavBar>boss</NavBar>
				<WingBlank>
					<div className='avatar_img' onClick={this.show}>
						<i className={this.state.header ? 'none' : 'black'}>点击设置头像</i>
						<img className={this.state.header ? 'black' : 'none'} src={this.state.header} />
					</div>
					<Avatar isShow={this.state.isShow || false} getAvatar={this.getAvatar}/>
					<WhiteSpace />
					<List>
						<InputItem placeholder="请输入你的职位名称" clear onChange={(val) => this.handleChange(val, 'post')}>职位名称:</InputItem>
						<InputItem placeholder="请输入你的公司名称" clear onChange={(val) => this.handleChange(val, 'company')}>公司名称:</InputItem>
						<InputItem placeholder="请输入你的薪资待遇" clear onChange={(val) => this.handleChange(val, 'salary')}>工资:</InputItem>
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
)(bossInfo)