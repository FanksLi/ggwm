export default function RedirectToPath (type, Header) {
	// 1. 有type，有的话就根据条件跳转到info
		// 1.1 当type为0 ，就跳转到'/joberInfo'
			// 1.1.1 hender有值，跳转到'/jober'
		// 1.2 当type为1，就跳转到'/bossInfo'
			// 1.1.1 hender有值，跳转到'/jober'
	// 2. 无type，没有的话就跳转到登录页面
	let path
	let headerPath = Header ? '': 'Info'
	if (type === 0) {
		path = '/jober' + headerPath
	} else if(type === 1) {
		path = '/boss' + headerPath
	} else {
		path = '/'
	}
	return path
}