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
import {
	reqLogin,
	reqRegister,
	reqUpdata,
	reqUser,
	reqUserList,
	reqChatList,
	updataMsg
} from '../api/index.js'
import io from 'socket.io-client'

// 获取消息列表方法
async function getChatList (dispatch, userId) {
	const { data:res } = await reqChatList()
	if (res.code === 0) {
		const {users, chatMsgs} = res.data
		dispatch(getChats({users, chatMsgs, userId}))
	}
}
// 初始化socket
function initIo (dispatch, userId) {
	getChatList(dispatch, userId)
	if (!io.socket) {
		console.log(123)
		io.socket = io('http://localhost:3000')
		io.socket.on('receiveMsg', function (chatMsg) {
			getChatList(dispatch, userId)
			if(chatMsg.from===userId || chatMsg.to===userId) {
				dispatch(receiveChat(chatMsg, userId))
				console.log('receiveMsg', chatMsg)
			}
		})
	}
}


const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const updataSuccess = (userInfo) => ({type: UPDATA_INFO, data: userInfo})
// 重置数据
export const registerInfo = (msg) => ({type: REGISTER_INFO, msg: msg})
const getUserList = (userList) => ({type: REQ_USER_LIST, data: userList})
const userListErr = (msg) => ({type: REQ_USER_LIST_ERR, data: msg})
// 接收信息
const receiveChat = (chatMsg, userId) => ({type: RECEIVE_CHAT, data: {chatMsg, userId}})
// 获取消息列表
const getChats = ({users, chatMsgs, userId}) => ({type: REQ_CHAT_LIST, data: {users, chatMsgs, userId}})
// 更新已读消息
const upDataReadMsg = (num, from, to) => ({type: UPDATA_READ_MSG, data: {num, from, to}})
// 注册actions方法
export function register ({username, password, password2, type}) {
	if (!username || !password) {
		return errorMsg('用户名密码不能为空')
	}
	if (password !== password2) {
		return errorMsg('密码和确认密码不一致')
	}
	return async dispatch => {
		const { data: res } = await reqRegister({username, password, type})
		console.log(res)
		if(res.code === 0) {
			initIo(dispatch, res.data._id)
			dispatch(authSuccess(res.data))
		} else {
			dispatch(errorMsg(res.msg))
		}
	}
}
// 登录方法
export function login ({username, password}) {
	if (!username || !password) {
		return errorMsg('用户名密码不能为空')
	}
	return async dispatch => {
		const { data: res } = await reqLogin({username, password})
		if(res.code === 0) {
			initIo(dispatch, res.data._id)
			dispatch(authSuccess(res.data))
		} else {
			dispatch(errorMsg(res.msg))
		}
	}
}
// 上传信息
export function updata (userInfo) {
	return async dispatch => {
		const { data: res } = await reqUpdata(userInfo)
		if (res.code === 0) {
			dispatch(updataSuccess(res.data))
		} else {
			dispatch(userListErr(res.msg))
		}
	}
}
// 获取数据
export function getUser () {
	return async dispatch => {
		const { data: res } = await reqUser()
		if (res.code === 0) {
			initIo(dispatch, res.user._id)
			dispatch(updataSuccess(res.user))
		} else {
			dispatch(registerInfo(res.msg))
		}
	}
}
// 获取列表数据
export function getList (type) {
	return async dispatch => {
		const { data: res } = await reqUserList({type})
		if (res.code === 0) {
			dispatch(getUserList(res.userList))
		} else {
			dispatch(userListErr(res.msg))
		}
	}
}
// 发送信息
export function sendChat ({from, to, content}) {
		io.socket.emit('sendMsg', {from, to, content})
}
// 更新已读消息
export function upDataMsg (from, to){
	return async dispatch => {
		const { data: res } = await updataMsg({from})
		if (res.code === 0) {
			dispatch(upDataReadMsg(res.data, from, to))
		} else {
			dispatch(upDataReadMsg(0))
		}
	}
}