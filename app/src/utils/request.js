/**
 * Created by Pororo on 17/5/17.
 */
import codeHelper from '../utils/codeHelper'
import getToken from './getTokenAdmin'
import getUserToken from './getTokenUser'
const TIMEOUT = 15000

function filterStatus (json) {
  if (json.code === 0) {
    return json.data
  } else if (json.code === 20001 || json.code === 20002) {
    return json
  } else {
    throw new Error('ResponseUnexpected', codeHelper(json.code))
  }
}

/**
 * 参数拼接
 * @param url
 * @param params
 * @returns {*}
 */
function parseParams (url, params) {
  const paramsArray = []
  Object.keys(params).forEach(key => params[key] && paramsArray.push(`${key}=${params[key]}`))
  if (url.search(/\?/) === -1) {
    url += `?${paramsArray.join('&')}`
  } else {
    url += `&${paramsArray.join('&')}`
  }
  return url
}

export async function request (url, type = 'GET', headers = {}, body = {}) {
  const timer = await setTimeout(() => {
    throw new Error('fetch time out')
  }, TIMEOUT)
  const fetchOption = {
    method: type,
    headers
  }
  if (type === 'POST'|| type === 'PUT') {
    fetchOption.body = JSON.stringify(body)
  }
  const res = await fetch(url, fetchOption)
  const json = await res.json()

  clearTimeout(timer)
  return filterStatus(json)
}

/**
 * get 请求
 * @param url api url
 * @param params 参数拼接
 * @param headers 请求头部
 * @returns {*}
 */
export function get (url, params, headers) {
  if (params) {
    url = parseParams(url, params)
  }
  return request(url, 'GET', headers)
}

export function tget (url, params, headers = {}) {
  if (params) {
    url = parseParams(url, params)
  }
  headers = {
    ...headers,
    token: getToken()
  }
  return request(url, 'GET', headers)
}

/**
 * post 请求
 * @param url api url
 * @param body 请求 body
 * @param headers 请求头部
 * @returns {*}
 */
export function post (url, body, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  return request(url, 'POST', headers, body)
}

export function tpost (url, body, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  headers = {
    ...headers,
    token: getToken()
  }
  return request(url, 'POST', headers, body)
}

export function verify (url, body, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  headers = {
    ...headers,
    token: getUserToken()
  }
  return request(url, 'GET', headers, body)
}

/**
 * delete 请求
 * @param url api url
 * @param headers 请求头部
 * @returns {*}
 */

export function Delete (url, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  headers = {
    ...headers,
    token: getToken()
  }
  return request(url, 'DELETE', headers)
}

/**
 * put 请求
 * @param url api url
 * @param headers 请求头部
 * @returns {*}
 */

export function put (url, body = {} ,headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  headers = {
    ...headers,
    token: getToken()
  }
  return request(url, 'PUT', headers, body)
}
export function uput (url, body, headers = {}) {
  if (!headers['Content-type']) {
    headers['Content-type'] = 'application/json'
  }
  headers = {
    ...headers,
    token: getUserToken()
  }
  return request(url, 'PUT', headers, body)
}

