import React, { Component } from 'react'
import { Icon } from 'antd'
import './index.less'

class Headers extends Component {
  goBack=()=>{
    window.history.go(-1)
  }
  render () {
    return (
      <div>
        <div className="header">
          <div className="header-back header-item" onClick={this.goBack}>
            <Icon type="left" />返回
          </div>
          <div className="header-content header-item">投票系统</div>
          <div className="header-more header-item">
          </div>
        </div>
      </div>
    )
  }
}
export default Headers
