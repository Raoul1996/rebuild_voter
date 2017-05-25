/**
 * Created by Pororo on 17/5/24.
 */
'use strict'
import Goto from './goto'

export default () => {
  window.localStorage.clear()
  Goto('login')
}
