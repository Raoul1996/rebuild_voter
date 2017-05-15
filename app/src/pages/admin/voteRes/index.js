import React from 'react'
import { Col, Row, Button, Table } from 'antd'
const updateTime = new Date().getTime()
// import { Table } from 'antd'

const columns = [
  {title: '选项序号', width: 100, dataIndex: 'name', key: 'name', fixed: 'left'},
  {title: '选项内容', dataIndex: 'content', key: '1'},
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">action</a>,
  },
]

const data = [
  {
    key: '1',
    name: '1',
    content: '不洗碗工作室不洗碗工作室不洗碗工作室'
  },
  {
    key: '2',
    name: '2',
    content: '不洗碗工作室不洗碗工作室不洗碗工作室222'
  },
]
const ListStyle = {
  // background: 'rgb(240,20,20)',
  textAlign: 'center',
  marginTop: '3vw',
  minWidth: '1000px'
}
const MarginStyle = {
  marginTop: '20px'
}
const ButtonStyle = {
  float: 'right'
}
const TitleStyle = {
  color: '#333'
}
export default () => (
  <div className="vote-wrapper">
    <Row>
      <Col span={22} offset={1}>
        <h1 className="vote-title">票数统计——不洗碗工作室最美程序员</h1>
      </Col>
      <Col span={22} offset={1}>
        {updateTime}更新
        <Button className="vote-button">下载表格</Button>
      </Col>
      <Col span={22} offset={1} className="list-table">
        <Table columns={columns} dataSource={data} scroll={{x: 1300}} />
      </Col>
    </Row>
  </div>
)