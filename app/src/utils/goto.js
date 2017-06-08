import {hashHistory} from 'react-router'
/** 由于登录之后我们还是可以进入到login页面和register页面，导致我们的应用会出现崩溃
 * 所以在goto的时候做一下校验
 * @param path
 */
// function getItem (item) {
//   return (window.localStorage.getItem(item))
// }
export default function (path){
  // if (!(getItem('is_login') ===1)&&(path.match(/login/) || path.match(/register/))){
    hashHistory.push(path)
  // }else {
  //   hashHistory.push('/users/list')
  // }
}
