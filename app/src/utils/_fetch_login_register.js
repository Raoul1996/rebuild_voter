export function   userLogin (mobile, password) {
  fetch(API.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': window.localStorage.getItem('token')
    },
    body: JSON.stringify({
      mobile: mobile,
      password: password
    })
  }).then((res) => res.json())
    .then((json) => {
      if (json.code === ERR_OK) {
        window.localStorage.setItem('token', json.data.token)
        window.localStorage.setItem('mobile', json.data.user.mobile)
      }
    })
}
export function   userRegister (userName, password, code) {
  if (!testArgs(userName, Regx.mobile) || !testArgs(password, Regx.password))return
  console.log('will come to the userLogin func')
  if (window.localStorage.getItem('token') === '') {
    console.error('no token in the localStorage')
  } else {
    console.log(window.localStorage.getItem('token'))
  }
  fetch(API.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': window.localStorage.getItem('token')
    },
    body: JSON.stringify({
      mobile: userName,
      password: password,
      code: code
    })
  }).then((res) => res.json())
    .then((json) => {
      console.log('fetch data successful')
      console.log(json)
      if (json.code === ERR_OK) {
        console.log('register successful')
        // window.localStorage.setItem('token',json.data.token)
      }
    })
}