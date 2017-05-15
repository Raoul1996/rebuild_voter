import React, { Component } from 'react'
import { Card, Col, Row, Icon } from 'antd'
import './index.less'
import avatar from './avatar.png'
// 投票的标题
let title = '不洗碗工作室最美程序员选举选举'
// 投票的人数
let voterNum = 10
let runing = true
function limitStringNum (title) {
  if (title.length > 10) {
    return `${title.substr(0, 8)}……`
  } else {
    return title
  }
}

class ShowList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    // let title = this.props.title
    return (
      <div className="list-item-wrapper">
        <Card>
          <div className="item-title">
            <h3>{limitStringNum(title)}</h3>
          </div>
          <div className="item-voter">
            <img src={avatar} className="item-voter-icon" />
            <span className="item-voter-num">{voterNum}</span>
          </div>
          <div className="item-status">
            <div className="item-status-text item-status-item">{runing ? '进行中' : '未开始'}</div>
            <div className="item-status-time item-status-item">剩余{'5小时25分钟'}</div>
          </div>
        </Card>
      </div>
    )
  }
}
export default ShowList