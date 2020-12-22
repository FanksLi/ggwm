import axios from 'axios'

export default function ajax(url='', data={}, type='GET') {
	if (type === 'GET') {
		let str = ''
		Object.keys(data).forEach(val => {
			str += val + '=' + data[val] + '&'
		})
		if (str) {
			str = str.substring(0, str.lastIndexOf('&'))
			url = url + '?' + str
		}
		return axios.get(url)
	} else if (type === 'POST') {
		return axios.post(url, data)
	}
}