import React, { Component } from 'react'
import { Col, Row, Button, Table, Card } from 'antd'
import timeTransform from '../../../utils/timeTransfrom'
const updateTime = new Date().getTime()
import './index.less'

const MarginStyle = {
  marginTop: '20px',
  fontSize: '15px'
}

export default class VoteRes extends Component {

  render () {

    const columns = [
      {title: '选项序号', width: '14%', dataIndex: 'id', key: 'id'},
      {title: '选项内容', width: '70%', dataIndex: 'content', key: 'content'},
      {title: '数量', width: '8%', dataIndex: 'number', key: 'number'},
      {title: '占比', width: '8%', dataIndex: 'per', key: 'per'}
    ]

    const list = [{
      id: 68,
      content: 'Test4121',
      num: 3,
      per: 2
    }, {
      id: 68,
      content: 'Test4121',
      num: 3,
      per: 2
    }, {
      id: 68,
      content: 'Test4121',
      num: 3,
      per: 2
    }, {
      id: 68,
      content: 'Test4121',
      num: 3,
      per: 2
    }]
    return (
      <Row>
        <Card className="vote-wrapper">
            <Col span={22} offset={1}>
              <h1 className="vote-title">票数统计——不洗碗工作室最美程序员</h1>
            </Col>
            <Col span={22} offset={1} style={MarginStyle}>
              <Col span={22}>{timeTransform(updateTime)}更新</Col>
              <Button className="vote-button">下载表格</Button>
            </Col>
            <Col span={22} offset={1} className="list-table">
              <Table columns={columns} dataSource={list} scroll={{x: 1300}} />
            </Col>
        </Card>
      </Row>
    )
  }
}