import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './containers/Login/Login.js'
import Register from './containers/Register/Register.js'
import App from './containers/App/App.js'
import { HashRouter, Route, Switch } from 'react-router-dom'

ReactDom.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				<Route path='/login' component={Login}>
				</Route>
				<Route path='/register' component={Register}>
				</Route>
				<Route component={App}>
				</Route>
			</Switch>
		</HashRouter>
	</Provider>,
document.getElementById('root')
)