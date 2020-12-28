const { ChatModel } = require('../db/models.js')

module.exports = function (server) {
	const io = require('socket.io')(server)
	io.on('connection', function (socket) {
		console.log('socket connection')
		socket.on('sendMsg', function (data) {
			console.log('服务器接收到的消息:', data)
			const {from, to, content} = data
			const chat_id = [from, to].sort().join('_')
			const create_time = Date.now()
			new ChatModel({from, to, content, chat_id, create_time}).save((err, chat) => {
				io.emit('receiveMsg', chat)
				// console.log('向客户端发送消息:', data)
			})
		})
	})
}