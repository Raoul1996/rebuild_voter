import React, { Component } from 'react'
import { Table, Icon } from 'antd'
import './index.less'
import { Link } from 'react-router'
import wechatIcon from './u690.png'
import QQtIcon from './u692.png'
import mobileIcon from './u694.png'
class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginStatus: 0
    }
  }

  render () {
    let is_login = window.localStorage.getItem('is_login') || '0'
    let is_vote = window.localStorage.getItem('is_vote') || '0'
    return (
      <div className="footer-wrapper" style={{display: is_vote === '0' ? 'block' : 'none'}}>
        {
          is_login === '0' &&
          <div className="footer">
            <div className="footer-item">
              <img src={wechatIcon} alt="" />
            </div>
            <div className="footer-item">
              <Link to="users/login">
                <img src={mobileIcon} alt="" />
              </Link>
            </div>
            <div className="footer-item">
              <img src={QQtIcon} alt="" />
            </div>
          </div>
        }
        {
          is_login === '1' &&
          <div className="footer">
            <div className="footer-item">
              <Link to="users/list">
                投票活动
              </Link>
            </div>
            <div className="footer-item">
              <Link to="users/joined">
                参与过的投票活动
              </Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Footer