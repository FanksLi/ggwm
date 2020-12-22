const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')
mongoose.connection.once('open', function () {
	console.log('数据库链接成功')
})
const testSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})
const UserModel = mongoose.model('user', testSchema)
// new UserModel({ username: 'fanli', password: '123456' }).save((err, user) => {
// 	console.log(user)
// })