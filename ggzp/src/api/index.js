import ajax from './ajax.js'

// 注册请求
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登录请求
export const reqLogin = (user) => ajax('/login', user, 'POST')
// 上传数据
export const reqUpdata = (userInfo) => ajax('/updata', userInfo, 'POST')
// 获取用户信息
export const reqUser = () => ajax('/user')
// 获取用户列表
export const reqUserList = (type) => ajax('/list', type)