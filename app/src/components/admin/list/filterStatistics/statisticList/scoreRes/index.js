import React from 'react'
import { Col, Row, Button, Table, Card } from 'antd'
import timeTransform from '../../../../../../utils/timeTransfrom'
import './index.less'
const updateTime = new Date().getTime()
let scoreNum = [1, 2, 3, 4]
let scoreSum = scoreNum.reduce((prev, curr) => {return prev + curr})
let columns = [
  {title: '选项序号', width: 100, dataIndex: 'id', key: 'id'},
  {title: '选项内容', width: 100, dataIndex: 'content', key: 'content'}
]
scoreNum.forEach((item, index) => {
  columns.push(
    {title: `#${index + 1}`, dataIndex: `score${index+1}`, key: `score${index + 1}`, width: 40},
  )
})
columns.push(
  {
    title: '合计',
    key: 'sum',
    width: 50,
    render: () => <span>{scoreSum}</span>,
  }
)
const data = [{
  key: '1',
  id: 'John Brown',
  content: 'abc',
  score: '1',
  value:[9,8,7,6]
}, {
  key: '2',
  id: 'Jim Green',
  content: 'asd',
  score: '2',
  value:[9,8,7,6]
}, {
  key: '3',
  id: 'Jim Green',
  content: 'asdf',
  score: '3',
  value:[9,8,7,6]
}, {
  key: '4',
  id: 'Jim Green',
  content: 'asdfsa',
  score1: '0',
  score2: '99',
  score3: '9',
  value:[9,8,7,6]
}, {
  key: '5',
  id: 'Jim Green',
  content: 'asdfsafasf',
  score: '9',
  value:[9,8,7,6]
},
]

export default () => (
  <Row>
    <Card className="score-wrapper">
      <Col span={22} offset={1}>
        <h1 className="score-title">分数统计——不洗碗工作室最美程序员</h1>
      </Col>
      <Col span={22} offset={1}>
        {timeTransform(updateTime)}更新
        <Button className="score-button">下载表格</Button>
      </Col>
      <Col span={22} offset={1} className="list-table">
        <Table columns={columns} dataSource={data} scroll={{x: 1300}} />
      </Col>
    </Card>
  </Row>

)