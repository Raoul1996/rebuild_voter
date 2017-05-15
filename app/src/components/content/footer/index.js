import React from 'react'
import { Table, Icon } from 'antd'
import './index.less'

import wechatIcon from './u690.png'
import QQtIcon from './u692.png'
import mobileIcon from './u694.png'
const Footer = () => (
  <div>
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
  </div>
)
export default Footer