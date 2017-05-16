/**
 * Created by out_xu on 17/2/19.
 * 借鉴http://www.tuicool.com/articles/uaIr2mj
 */

export default (uri, params) => {
  const paramsArray = []
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`
  } else {
    uri += `&${paramsArray.join('&')}`
  }
  return uri
}