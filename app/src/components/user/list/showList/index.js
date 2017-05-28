import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Col, Row, Icon } from 'antd'
import eventProxy from '../../../../utils/eventProxy'
import './index.less'
import restTime from '../../../../utils/restTime'
import urlEncoder from '../../../../utils/urlEncoder'
import avatar from './avatar.png'
// 投票的标题
let title = '不洗碗工作室最美程序员选举选举'
// 投票的人数
function limitStringNum (title) {
  if (title.length > 8) {
    return `${title.substr(0, 6)}……`
  } else {
    return title
  }
}

class ShowList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginStatus: 0
    }
  }

  changeState = () => {
    if(window.localStorage.getItem('is_login') === '1'){
      window.localStorage.setItem('is_vote',1)
    }
  }

  render () {
    let list = this.props.list
    return (
      <Col span={10} offset={1}>
        <div className="list-item-wrapper">
          <Card onClick={this.changeState}>
            <Link className='link' to={urlEncoder('users/vote', {
              'voteid': this.props.voteId,
              'flag': list.flag+1
            })}>
              <div className="item-title">
                <h3>{limitStringNum(list.title)}</h3>
              </div>
              <div className="item-voter">
                <img src={avatar} className="item-voter-icon" />
                <span className="item-voter-num">{list.participatorNum}</span>
              </div>
              <div className="item-status">
                <Row>
                  <div className="item-status-text item-status-item">
                    {list.flag === 0 ? '未开始' : (list.flag === 1 ? '进行中' : '已结束')}
                  </div>
                </Row>
                <Row>
                  <div className="item-status-time item-status-item">
                    {restTime(list.endTime)}
                  </div>
                </Row>
              </div>
            </Link>
          </Card>
        </div>
      </Col>
    )
  }
}
export default ShowList