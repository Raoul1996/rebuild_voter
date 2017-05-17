import React, { Component } from 'react'
import Login from '../../../components/admin/login'
import './index.less'

class AdminLogin extends Component {
  render () {
    return (
      <div className="admin-login-wrapper">
        <Login/>
      </div>
    )
  }
}
export default AdminLogin
