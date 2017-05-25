import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import {Link} from 'react-router'
import List from '../../../components/user/list/showList'
import LineText from '../../../components/user/content/lineText'
import MsgListComponent from '../../../components/user/content/msgList'
import Logo from '../../../components/user/content/lineText/index'
import './index.less'
class Item extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let voteItems = list.map(function (item) {
      if (!item.deleted) {
        return (
          <List
            status={item.endTime - Date.parse(new Date()) < 0}
            key={item.id}
            action={action}
            voteId={item.id}
          />
        )
      }
    })
    return (
      <div className="show-list-wrapper">
        <Col span={23} offset={1}>
          <Link to="/users/change">
            <div className="msg-bar">
              <MsgListComponent label="手机号" text="15012321234" />
            </div>
          </Link>
          <Logo text="不洗碗工作室" />
          <div className="show-list">
            <Row>
              {voteItems}
            </Row>
          </div>
        </Col>
      </div>
    )
  }
}
export default Item