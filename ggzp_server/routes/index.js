var express = require('express');
var router = express.Router();
var md5 = require('blueimp-md5')

const filter = { password: 0, __v: 0 }

var { UserModel, ChatModel } = require('../db/models.js')

/* GET home page. */
router.post('/register', function (req, res) {
	const { username, password, type } = req.body
	UserModel.findOne({ username }, function (err, user) {
		if(user) {
			res.send({ code: 1, msg: '用户名已存在'})
		} else {
			new UserModel({username, type, password: md5(password)}).save((err, user) => {
				res.cookie('id', user._id, { maxAge: 1000*60*60*24 })
				res.send({ code: 0, data: { username, type, _id: user._id }})
			})
		}
	})
})
router.post('/login', function (req, res) {
	const { username, password } = req.body
	UserModel.findOne({ username, password: md5(password) }, filter, function (err, user) {
		if(user) {
			res.cookie('id', user._id, { maxAge: 1000*60*60*24 })
			res.send({ code: 0, data: { user } })
		} else {
			res.send({ code: 1, msg: '账号或密码有误！'})
		}
	})
})
router.post('/updata', function (req, res) {
	let data = req.body
	const userId = req.cookies.id
	if (!userId) {
		return res.send({code: 1, msg: '请先登录'})
	}
	UserModel.findByIdAndUpdate({_id: userId}, data, function (err, user) {
		const {username, type, _id} = user
		data = Object.assign({username, type, _id}, data)
		res.send({code: 0, data})
	})
})
router.get('/user', function (req, res) {
	const id = req.cookies.id
	if (!id) {
		return res.send({code: 1, msg:'请先登录'})
	}
	UserModel.findOne({_id: id}, filter, function (err, user) {
		if(!user) {
		return res.send({code: 1, msg:'无效id'})
		}
		res.send({code: 0, user})
	})
})
router.get('/list', function (req, res) {
	let { type } = req.query
	type = type - 0
	UserModel.find({type}, filter, function (err, userList) {
		if (!userList) {
			res.send({code: 1, msg: '网络繁忙，稍后再试'})
		}
		res.send({code: 0, userList})
	})
})
// 获取消息列表
router.get('/msglist', function (req, res) {
	const userId = req.cookies.id
	UserModel.find(function (err, user) {
		const users = {}
		user.forEach(val => {
			users[val._id] = { username: val.username, header: val.header }
		})
		ChatModel.find({'$or':[{from: userId}, {to: userId}]}, filter, function (err, chatMsgs) {
			if (err) {
				return res.send({code: 1, msg: '网络繁忙稍后再试试吧！'})
			}
			res.send({code: 0, data:{users, chatMsgs}})
		})
	})
})
// 更新已读消息
router.post('/readmsg', function (req, res) {
	const to = req.cookies.id
	const from = req.body.from
	console.log(from, to)
	ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
		console.log('updata', doc)
		res.send({code: 0, data: doc.nModified})
	})
})
module.exports = router;
