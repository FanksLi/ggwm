import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class Avatar extends Component {
	state = {
		avatarList: [],
	}
	static propTypes = {
		isShow: PropTypes.bool,
		handleClick: PropTypes.func
	}
	handleClick = (el) => {
		this.props.getAvatar(el, false)
		console.log(el)
	}
	componentDidMount () {
		const arr = []
		for (let i = 0; i < 20; i++) {
			const text = `头像${i+1}`
			arr.push(
				{ icon: `images/${i+1}.png`, text}
			)
			this.setState({
				avatarList: arr
			})
		}
	}
	render () {
		return (
			<div>
				<div className={this.props.isShow ? 'black':'none'}>
					<List>
						<Grid data={this.state.avatarList} columnNum={4} onClick={this.handleClick}></Grid>
					</List>
				</div>
			</div>
		)
	}
}