import { combineReducers } from 'redux'
import {
	AUTH_SUCCESS,
	ERROR_MSG,
	UPDATA_INFO,
	REGISTER_INFO,
	REQ_USER_LIST,
	REQ_USER_LIST_ERR,
	RECEIVE_CHAT,
	REQ_CHAT_LIST
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
	chatMsgs: []
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
			return { users: state.users, chatMsgs: [...state.chatMsgs, action.data] }
		case REQ_CHAT_LIST:
			return action.data
		default:
			return state
	}
}
export default combineReducers({
	user,
	userList,
	Chat
})