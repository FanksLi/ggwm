import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import { sendChat } from '../../redux/action.js'

const Item = List.Item
class Chat extends Component {
	state = {
		content: '',
		isShow: false
	}
	componentDidMount() { // 初始显示列表
		window.scrollTo(0, document.body.scrollHeight)
	}
	componentDidUpdate () { // 更新显示列表
		window.scrollTo(0, document.body.scrollHeight)
	}
	componentWillMount() {
		this.expression = ['😀', '😄','😅', '😍','😴', '🤢','😲', '💩','😈', '🥱','👌', '👍','👎',
		 '🤝','💪', '🧑‍🦲','😀', '😄','😅', '😍','😴', '🤢','😲', '💩','😈', '🥱','👌', '👍','👎',
			'🤝','💪', '🧑‍🦲']
		this.emojis = this.expression.map(val => ({text: val}))
	}
	// 打开表情
	handleClick = () => {
		const { isShow } = this.state
		this.setState({
			isShow: !isShow
		})
	}
	emojiClick = (el, index) => {
		this.setState({
			content: this.state.content + el.text,
			isShow: false
		})
	}
	// 发送信息
	sendClick = () => {
		const from = this.props.user._id
		const to = this.props.match.params.userId
		const content = this.state.content.trim()
		if (content) {
			sendChat({from, to, content})
		}
		this.setState({
			content: ''	
		})
	}
	handleChange = (val) => {
		this.setState({
			content: val
		})
	}
	render () {
		const chatList = this.props.Chat.chatMsgs
		const userId = this.props.user._id
		const userObj = this.props.Chat.users
		const id = this.props.match.params.userId
		const list = []
		chatList.forEach(val => {
			if(val.from === id || val.to === id) {
				list.push(val)
			}
		})
		if (!userObj[id]) {
			return null
		}
		return (
			<div>
				<NavBar
					className='headerTop'
					icon={<Icon type='left' />}
					onLeftClick={() => this.props.history.go(-1)}
				>{userObj[id].username}</NavBar>
				<List className='list'>
					{ 
						list.map(chat => {
							if (chat.from === userId) {
								return <Item
									key={chat._id}
									className='text-right'
									thumb={userObj[chat.from].header}
								>
								{chat.content}
								</Item>
							} else if (chat.from === id ) {
								return <Item
									key={chat._id}
									thumb={userObj[chat.from].header}
								>
								{chat.content}
								</Item>
							}
								
						})
					}
				</List>
				<div className='footer-input'>
					{this.state.isShow ? <Grid data={this.emojis} onClick={this.emojiClick} columnNum={8}></Grid> : null}
					<InputItem
						value={this.state.content}
						placeholder='请输入...'
						onChange={this.handleChange}
						extra={
							<span>
								<span style={{fontSize: 20, marginRight: 10}} onClick={this.handleClick}>😀</span>
								<span onClick={this.sendClick}>发送</span>
							</span>
						}
					></InputItem>
				</div>
			</div>
		)
	}
}
export default connect(
	state => state,
	{}
)(Chat)