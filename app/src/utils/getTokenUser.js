/**
 * Created by Pororo on 17/5/20.
 */
import logout from './logout'
export default () => {
  if (!window.localStorage) {
    console.log('您的浏览器不支持window.localStorage,请更新您的浏览器')
  } else {
    if (window.localStorage.getItem('token')) {
      return window.localStorage.getItem('token')
    } else {
      logout()
    }
  }
}
