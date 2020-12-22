import {
	AUTH_SUCCESS,
	ERROR_MSG,
	UPDATA_INFO,
	REGISTER_INFO,
	REQ_USER_LIST,
	REQ_USER_LIST_ERR
} from './actionType.js'
import {
	reqLogin,
	reqRegister,
	reqUpdata,
	reqUser,
	reqUserList
} from '../api/index.js'

const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const updataSuccess = (userInfo) => ({type: UPDATA_INFO, data: userInfo})
// 重置数据
export const registerInfo = (msg) => ({type: REGISTER_INFO, msg: msg})
const getUserList = (userList) => ({type: REQ_USER_LIST, data: userList})
const userListErr = (msg) => ({type: REQ_USER_LIST_ERR, data: msg})
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
		if(res.code === 0) {
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