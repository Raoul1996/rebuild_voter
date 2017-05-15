import React, { Component } from 'react'
import { Table, Icon } from 'antd'
import './index.less'

class Headers extends Component {
  render () {
    return (
      <div>
        <div className="header">
          <div className="header-back header-item" onClick={() => { window.history.go(-1) }}>
            <Icon type="left" />返回
          </div>
          <div className="header-content header-item">投票系统</div>
          <div className="header-more header-item">
            <Icon type="ellipsis" />
          </div>
        </div>
      </div>
    )
  }
}
export default Headers
