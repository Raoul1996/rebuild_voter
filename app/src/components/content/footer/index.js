import React, {Component} from 'react'
import { Table, Icon } from 'antd'
import './index.less'
import eventProxy from '../../../utils/eventProxy'
import wechatIcon from './u690.png'
import QQtIcon from './u692.png'
import mobileIcon from './u694.png'
class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginStatus: false
    }
  }
  componentDidMount () {
    eventProxy.on('loginStatus', (loginStatus) => {
      this.state.loginStatus = loginStatus
    })
    console.log(this.state)
  }
  render () {
    return (
      <div className="footer-wrapper">
        {
          this.state.loginStatus === false &&
          <div className="footer">
            <div className="footer-item">
              <img src={wechatIcon} alt="" />
            </div>
            <div className="footer-item">
              <img src={mobileIcon} alt="" />
            </div>
            <div className="footer-item">
              <img src={QQtIcon} alt="" />
            </div>
          </div>
        }
        {
          this.state.loginStatus &&
          <div className="footer">
            <div className="footer-item">
              投票活动
            </div>
            <div className="footer-item">
              参与过的投票活动
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Footer