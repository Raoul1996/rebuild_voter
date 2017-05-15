import React from 'react'
import { Col, Row, Button, Table } from 'antd'
import './index.less'
const updateTime = new Date().getTime()
let scoreNum = [1, 2, 3, 4, 5, 56, 54, 646, 46, 46, 464, 6456,411,44,55665,454,41,45,58,52,45]
let scoreSum = scoreNum.reduce((prev, curr)=>{return prev+curr})
let columns = [
  {title: '选项序号', width: 100, dataIndex: 'id', key: 'id'},
  {title: '选项内容', width: 100, dataIndex: 'content', key: 'content'}
]
scoreNum.forEach((item, index) => {
  columns.push(
    {title: `#${index + 1}`, dataIndex: 'score', key: `score${index + 1}`, width: 40},
  )
})
columns.push(
  {
    title: '合计',
    key: 'sum',
    // fixed: 'right',
    width: 50,
    render: () => <span>{scoreSum}</span>,
  }
)
const data = [{
  key: '1',
  id: 'John Brown',
  content: 'asdfsafasfdadsdfasdfasfasfasfsafasdfasfsafsaffsafdsa',
  score: '1',
}, {
  key: '2',
  id: 'Jim Green',
  content: 'asdfsafasfdadsdfasdfasfasfasfsafasdfasfsafsaffsafdsa',
  score: '2',
}, {
  key: '3',
  id: 'Jim Green',
  content: 'asdfsafasfdadsdfasdfasfasfasfsafasdfasfsafsaffsafdsa',
  score: '3',
}, {
  key: '4',
  id: 'Jim Green',
  content: 'asdfsafasfdadsdfasdfasfasfasfsafasdfasfsafsaffsafdsa',
  score: '5',
}, {
  key: '5',
  id: 'Jim Green',
  content: 'asdfsafasfdadsdfasdfasfasfasfsafasdfasfsafsaffsafdsa',
  score: '9',
},
]
export default () => (
  <div className="score-warpper">
    <Row>
      <Col span={22} offset={1}>
        <h1 className="score-title">分数统计——不洗碗工作室最美程序员</h1>
      </Col>
      <Col span={22} offset={1}>
        {updateTime}更新
        <Button className="score-button">下载表格</Button>
      </Col>
      <Col span={22} offset={1} className="list-table">
        <Table columns={columns} dataSource={data} scroll={{x: 1300}} />
      </Col>
    </Row>
  </div>
)