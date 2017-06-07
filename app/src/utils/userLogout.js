'use strict'
import Goto from '../utils/goto'
const targetPath = '/users/login'
import {message} from 'antd'
export default () => {
  if(window.localStorage.getItem('user.token')){
    window.localStorage.clear()
    message.warning('登录失效，请重新登录')
    setTimeout(Goto(targetPath),5000)
  }
}
