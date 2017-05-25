'use strict'

const targetPath = '/users/login'
import {browserHistory} from 'react-router'
export default () => {
  window.localStorage.clear()
  browserHistory.push(targetPath)
}
