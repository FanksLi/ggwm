import { combineReducers } from 'redux'
import {
	AUTH_SUCCESS,
	ERROR_MSG,
	UPDATA_INFO,
	REGISTER_INFO,
	REQ_USER_LIST,
	REQ_USER_LIST_ERR,
	RECEIVE_CHAT,
	REQ_CHAT_LIST,
	UPDATA_READ_MSG
} from './actionType.js'
import RedirectToPath from '../unit/RedirectToPath.js'
const initUser = {
	username: '',
	type: null,
	msg: '',
	redirectTo: ''
}
const initUserList = []
const ChatList = {
	users:{},
	chatMsgs: [],
	counts: 0
}
function user (state=initUser, action) {
	switch (action.type){
		case AUTH_SUCCESS:
			const {type, header} = action.data
			console.log(type, header)
			return {...action.data, redirectTo: RedirectToPath(type, header)}
		case ERROR_MSG:
			return {...state, msg: action.data}
		case UPDATA_INFO:
			return action.data
		case REGISTER_INFO:
			return {...initUser}
		default:
			return state
	}
}
function userList (state = initUserList, action) {
	switch (action.type){
		case REQ_USER_LIST:
			return action.data
		case REQ_USER_LIST_ERR:
			return action.data
		default:
			return state
	}
}
function Chat (state = ChatList, action) {
	switch (action.type){
		case RECEIVE_CHAT:
		let counts = state.counts
		if (action.data.userId === action.data.chatMsg.to && !action.data.chatMsg.read) {
			counts = action.data.chatMsg.read ? state.counts : state.counts + 1
		}
			return { users: state.users, chatMsgs: [...state.chatMsgs, action.data.chatMsg], counts }
		case REQ_CHAT_LIST:
			let { userId } = action.data
			let num = action.data.chatMsgs.reduce((total, msg) => {
				return total + (!msg.read&&msg.to===userId ? 1 : 0)
			}, 0)
			console.log(num, '获取请求')
			return {...action.data, counts: num}
		case UPDATA_READ_MSG:
			const {count, from, to} = action.data
			// let {chatMsgs, userId: id} = state
			// chatMsgs: chatMsgs.map(msg => {
			// 	if (id === msg.to && !msg.read) {
			// 		return {...msg, read: true}
			// 		console.log(msg.read, 'hahah')
			// 	} else {
			// 		return msg
			// 	}
			// })
			// console.log(chatMsgs)
			return {...state, chatMsgs: state.chatMsgs.map(msg => {
				if (msg.from === from && msg.to === to && !msg.read) {
					return {...msg, read: true}
				} else {
					return msg
				}
			}), counts: state.counts - count}
		default:
			return state
	}
}
export default combineReducers({
	user,
	userList,
	Chat
})