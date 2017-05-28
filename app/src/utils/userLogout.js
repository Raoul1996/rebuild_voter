'use strict'
import Goto from '../utils/goto'
const targetPath = '/users/login'
export default () => {
  window.localStorage.clear()
  Goto(targetPath)
}
