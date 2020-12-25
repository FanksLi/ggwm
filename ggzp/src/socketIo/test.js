import io from 'socket.io-client'

const socket = io('ws://localhost:3000')
socket.on('receiveMsg', function (data) {
	console.log('浏览器接受的信息:', data)
})

socket.emit('sendMsg', {name: 'Fan', age: 22})
console.log('浏览器给服务器发送：', {name: 'Fan', age: 22})