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
    let list = this.props.list
    return (
      <Col span={10} offset={1}>
        <div className="list-item-wrapper">
          <Card>
            <div className="item-title">
              <h3>{limitStringNum(list.title)}</h3>
            </div>
            <div className="item-voter">
              <img src={avatar} className="item-voter-icon" />
              <span className="item-voter-num">{list.participatorNum}</span>
            </div>
            <div className="item-status">
              <div className="item-status-text item-status-item">
                {list.flag === 0 ? '未开始' : (list.flag === 1 ? '进行中' : '已结束')}
              </div>
              <div className="item-status-time item-status-item">剩余{list.endTime-list.startTime}</div>
            </div>
          </Card>
        </div>
      </Col>
    )
  }
}
export default ShowList