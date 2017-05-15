import React from 'react'
import Login from '../../../components/user/login'
import './index.less'
const title = '登录'
export default () => (
  <div className="login-wrapper">
    <Login title={title} className="login" />
  </div>
)