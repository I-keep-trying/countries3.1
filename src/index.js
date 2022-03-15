import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './assets/css/semantic.css'
import 'react-aspect-ratio/aspect-ratio.css'
import 'react-app-polyfill/ie11'
import 'core-js'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
//  "proxy": "https://sheltered-scrubland-08732.herokuapp.com",
// local proxy: "proxy": "http://localhost:3001/"
// backend: https://github.com/I-keep-trying/my-app-backend
