import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
const Item = TabBar.Item
class FooterTab extends Component {
	static propTypes = {
		navList: PropTypes.array.isRequired,
		counts: PropTypes.number.isRequired
	}
	render () {
		let navList = this.props.navList
		const pathname = this.props.location.pathname
		navList = navList.filter(val => !val.hide)
		return (
			<div className='tab-bar'>
				<TabBar>
					{navList.map((nav, index) => (
						<Item
							badge={nav.path === '/message' ? (this.props.counts || 0) : 0}
							selected={nav.path === pathname}
							title={nav.title}
							key={index}
							icon={<img src={`images/nav/${nav.icon}.png`} style={{width: 20, height: 20, marginBottom: 5}}/>}
							selectedIcon={<img src={`images/nav/${nav.icon}-selected.png`} style={{width: 20, height: 20, marginBottom: 5}}/>}
							onPress={() => this.props.history.replace(nav.path)}
						/>
					))}
				</TabBar>
			</div>
		)
	}
}
export default withRouter(FooterTab)
