import React, { Component } from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

const Item = List.Item
const Brief = Item.Brief
/* 
	1. 获取chatMsgs数组
	2. 声明一个变量，存每条消息的对象{chat_id: xxx}
	3. 判断是否有lastmsg，没有就lastmsg
 */
function getListMsgs (chatMsgs, userId) {
	const lastMsgObjs = {}
	chatMsgs.forEach(msg => {
		// 未读数量初始化
		msg.count = 0
		// 获取id
		const chatId = msg.chat_id
		// 获取最后发送的消息
		const lastMsg = lastMsgObjs[chatId]
		// 当没有最后发送的消息时
		if (!lastMsg) { // 没有
			if (!msg.read && userId === msg.to) {
				msg.count = 1
				console.log(msg.mout)
			}
			lastMsgObjs[chatId] = msg
		} else {// 有
			if (msg.create_time > lastMsg.create_time && !msg.read) {
				lastMsgObjs[chatId] = msg
				msg.count = lastMsg.count
			}
			if (!msg.read && userId === msg.to) {
				msg.count++
			}
		}
	})
	// 将对象转换成数组
	const lastMsgs = Object.values(lastMsgObjs)
	// 排序(降序)
	lastMsgs.sort(function (msg1, msg2) {
		return msg2.create_time - msg1.create_time 
	})
	return lastMsgs
}

class Message extends Component {
	handleClick = (userId, to, from) => {
		const path = userId === from ? to : from
		this.props.history.push(`chat/${path}`)
	}
	render () {
		const { chatMsgs, users } = this.props.Chat
		const userId = this.props.user._id
		const listMsgs = getListMsgs(chatMsgs, userId)
		console.log(this.props)
		console.log(listMsgs)
		return (
			<List className='card-list'>
				{
					listMsgs.map(msg => {
						return (
							<Item
							onClick={() => this.handleClick(userId, msg.to, msg.from)}
							extra={<Badge text={msg.count}/>}
							thumb={userId === msg.to ? users[msg.from].header : users[msg.to].header }
							arrow='horizontal'
							key={msg._id}
							>
							{userId === msg.to ? users[msg.from].username : users[msg.to].username }
							<Brief>{msg.content}</Brief>
							</Item>
						)
					})
				}
			</List>
		)
	}
}

export default connect(
	state => state,
	{}
)(Message)