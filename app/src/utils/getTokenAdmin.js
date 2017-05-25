import logout from './userLogout'
export default () => {
  if (!window.localStorage) {
    console.log('您的浏览器不支持window.localStorage,请更新您的浏览器')
  } else {
    if (window.localStorage.getItem('admin.token')) {
      return window.localStorage.getItem('admin.token')
    } else {
      logout()
    }
  }
}
