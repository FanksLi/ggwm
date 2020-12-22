import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import { getUser } from '../../redux/action.js'
import redirectTo from '../../unit/RedirectToPath.js'
import '../../assets/index.less'

import JoberInfo from '../joberInfo/joberInfo.js'
import BossInfo from '../bossInfo/bossInfo.js'
import Message from '../message/message.js'
import Jober from '../jober/jober.js'
import Boss from '../boss/boss.js'
import Personal from '../personal/personal.js'
import NotFound from '../not-found/not-found.js'
import Footer from '../../components/footer-tab/footer-tab.js'
class App extends Component {
	navList = [ 
		{ 
			path: '/boss', // 路由路径
			component: Boss, 
			title: '大神列表', 
			icon: 'dashen', 
			text: '大神'
		},
		{
			path: '/jober', // 路由路径
			component: Jober, 
			title: '老板列表', 
			icon: 'laoban', 
			text: '老板'
		},
		{ 
			path: '/message', // 路由路径
			component: Message,
			title: '消息列表',
			icon: 'message',
			text: '消息'
		},
		{ 
			path: '/personal', // 路由路径
			component: Personal,
			title: '用户中心',
			icon: 'personal',
			text: '个人'
		}
	]
	componentDidMount () {
		// 根据id获取用户数据
		const id = Cookies.get('id')
		const { _id } = this.props.user
		if (id && !_id) {
			this.props.getUser()
		}
	}
	render () {
		const { navList } = this
		const id = Cookies.get('id')
		const { type, header, _id } = this.props.user
		if (!id) {
			return <Redirect to='/login'/>
		}
		if (_id) {
			let path = this.props.location.pathname
			if (path === '/') {
				path = redirectTo(type, header)
				return <Redirect to={path} />
			}
		} else {
			return null
		}
		
		const navPath = this.props.location.pathname
		const nav = navList.filter(val => val.path === navPath)
		const hidePath = type === 0 ? '/boss' : '/jober'
		navList.forEach(val => {
			val.hide = false
			if (val.path === hidePath) {
				val.hide = true
			}
		})
		return (
			<div>
				{ nav[0] ? <NavBar className='headerTop'>{nav[0].title}</NavBar> : null}
				<Switch>
					{navList.map((nav, index) => <Route path={nav.path} key={index} component={nav.component} />)}
					<Route path='/joberinfo' component={JoberInfo} />
					<Route path='/bossinfo' component={BossInfo} />
					<Route component={NotFound} />
				</Switch>
				{ nav[0] ? <Footer navList={ this.navList }/> : null}
			</div>
		)
	}
}
export default connect(
	state => state,
	{ getUser }
)(App)