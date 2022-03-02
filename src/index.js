import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/semantic.css'
import { Provider } from 'react-redux'
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