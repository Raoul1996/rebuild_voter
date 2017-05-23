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
    return (
      <div className="show-list-wrapper">
        <Link to="/users/change">
          <div className="msg-bar">
            <MsgListComponent label="手机号" text="15012321234" />
          </div>
        </Link>
        <Logo text="不洗碗工作室" />
        <div className="show-list">
          <Row>
            <Col span="10" offset={1}>
              <List />
            </Col>
            <Col span="10" offset={2}>
              <List />
            </Col>
          </Row>
          <Row>
            <Col span="10" offset={1}>
              <List />
            </Col>
            <Col span="10" offset={2}>
              <List />
            </Col>
          </Row>
          <Row>
            <Col span="10" offset={1}>
              <List />
            </Col>
            <Col span="10" offset={2}>
              <List />
            </Col>
          </Row>
          <Row>
            <Col span="10" offset={1}>
              <List />
            </Col>
            <Col span="10" offset={2}>
              <List />
            </Col>
          </Row>
          <LineText text="历史投票" />
          <Row>
            <Col span="10" offset={1}>
              <List />
            </Col>
            <Col span="10" offset={2}>
              <List />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Item