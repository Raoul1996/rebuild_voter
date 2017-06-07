/**
 * Created by Pororo on 17/5/24.
 */
'use strict'
import Goto from './goto'
import {message} from 'antd'

export default () => {
  window.localStorage.clear()
  message.warning('登录失效，请重新登录')
  setTimeout(Goto('login'),5000)
}
