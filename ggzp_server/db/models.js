const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ggzp')
const conn = mongoose.connection
conn.once('open', function() {
	console.log('数据库连接成功!')
})

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	}, // 用户名
	password: {
		type: String,
		required: true
	}, // 密码
	type: {
		type: Number,
		required: true
	}, // 用户类型: dashen/laoban
	header: {
		type: String
	}, // 头像名称
	post: {
		type: String
	}, // 职位
	info: {
		type: String
	}, // 个人或职位简介
	company: {
		type: String
	}, // 公司名称
	salary: {
		type: String
	} // 工资
})
// 定义 chats 集合的文档结构
 const chatSchema = mongoose.Schema({ 
	// 发送用户的 id
	from: {type: String, required: true}, 
	 // 接收用户的 id
	to: {type: String, required: true},
	 // from 和 to 组成的字符串 
	chat_id: {type: String, required: true},
	// 内容 
	content: {type: String, required: true}, 
	// 标识是否已读 
	read: {type:Boolean, default: false}, 
	// 创建时间 
	create_time: {type: Number} ,
})

const UserModel = mongoose.model('user', userSchema)

exports.UserModel = UserModel

// 定义能操作 chats 集合数据的Model 
const ChatModel = mongoose.model('chat', chatSchema) 
// 向外暴露 Model 
exports.ChatModel = ChatModel
