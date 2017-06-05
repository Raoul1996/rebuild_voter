import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Col, Row, Tag } from 'antd'
import './index.less'
import restTime from '../../../../utils/restTime'
import urlEncoder from '../../../../utils/urlEncoder'
import avatar from './avatar.png'

class ShowList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let list = this.props.list
    return (
      <Col span={10} offset={1}>
      {/*<Col span={10} offset={1}>*/}
        <div className="list-item-wrapper">
          <Card>
            <Link className='link' to={urlEncoder('users/vote', {
              'voteid': this.props.voteId,
              'flag': list.flag + ''
            })}>
              <div className="item-header">
                <div className="item-status-text item-status-item">
                  <Tag color={list.flag === 0 ? '#2db7f5' : (list.flag === 1 ? '#87d068' : '#f50')}>
                    {list.flag === 0 ? '未开始' : (list.flag === 1 ? '进行中' : '已结束')}
                  </Tag>
                </div>
                <div className="item-participator">
                  <img src={avatar} className="item-participator-icon" />
                  <span className="item-participator-num">{list.participatorNum}</span>
                </div>
              </div>
              <div className="item-title">
                <h3>{list.title}</h3>
              </div>
              <Row>
                <div className="item-status-time item-status-item">
                  {restTime(list.endTime)}
                </div>
              </Row>
            </Link>
            {/*<Link className='link' to={urlEncoder('users/vote', {*/}
              {/*'voteid': this.props.voteId,*/}
              {/*'flag': list.flag + ''*/}
            {/*})}>*/}
              {/*<div className="item-title">*/}
                {/*<h3>{list.title}</h3>*/}
              {/*</div>*/}
              {/*<div className="item-voter">*/}
                {/*<img src={avatar} className="item-voter-icon" />*/}
                {/*<span className="item-voter-num">{list.participatorNum}</span>*/}
              {/*</div>*/}
              {/*<div className="item-status">*/}
                {/*<Row>*/}
                  {/*<div className="item-status-text item-status-item">*/}
                    {/*{list.flag === 0 ? '未开始' : (list.flag === 1 ? '进行中' : '已结束')}*/}
                  {/*</div>*/}
                {/*</Row>*/}
                {/*<Row>*/}
                  {/*<div className="item-status-time item-status-item">*/}
                    {/*{restTime(list.endTime)}*/}
                  {/*</div>*/}
                {/*</Row>*/}
              {/*</div>*/}
            {/*</Link>*/}
          </Card>
        </div>
      </Col>
    )
  }
}
export default ShowList