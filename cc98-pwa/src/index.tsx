// config day.js
import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import App from './App'
// global style
import './style.css'

dayjs.locale(zh, null, false)
dayjs.extend(relativeTime)


ReactDOM.render(<App />, document.getElementById('root'))

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
    // .then(registration => {
    //   // console.log('SW registered: ', registration)
    // })
    // .catch(registrationError => {
    //   // console.log('SW registration failed: ', registrationError)
    // })
  })
}
