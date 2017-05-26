import React, { Component } from 'react'
import { Col, Row, Button, Table, Card } from 'antd'
import API from '../../../../../../api'
import * as Request from '../../../../../../utils/request'
import timeTransform from '../../../../../../utils/timeTransfrom'
import './index.less'

let data = [{
  key: '1',
  id: 'John Brown',
  content: 'abc',
  score: '1',
  sum: '100',
  value:[9,8,7,6]
}, {
  key: '2',
  id: 'Jim Green',
  content: 'asd',
  score: '2',
  sum: '101',
  value:[9,8,7,6]
}]

class ScoreRes extends Component {
  state = {
    voteId: this.props.location.query.voteid,
    optionValue: [1, 2, 3, 4],
    participatorNum: 4,
  }

  getRecord = async () => {
    try {
      await Request.tget(API.record.replace(/:voteId/, this.state.voteId), '', {})
        .then( (json) => {
          this.setState({
            optionValue: json.optionValue,
            participatorNum: json.participatorNum
          })
          console.log('getRecord'+json.optionValue)
          data = this.state.optionValue.map(function(item, index){
            const {id, sum, title, voteRecords} = item
            return ({
              key: index,
              id: id,
              content: title,
              value: voteRecords,
              sum: sum
            })
          })
        })
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount () {
    this.getRecord()
  }

  render () {

    const updateTime = new Date().getTime()

    let columns = [
      { title: '选项序号', width: 100, dataIndex: 'id', key: 'id' },
      { title: '选项内容', width: 100, dataIndex: 'content', key: 'content' }
    ]
    // let scoreNum = this.state.optionValue
    // scoreNum.forEach((item, index) => {
    //   columns.push(
    //     {
    //       title: `#${index + 1}`,
    //       render: (record) => {
    //         return <span>{record.value[index]}</span>
    //       },
    //       key: `score${index + 1}`,
    //       width: 40
    //     },
    //   )
    // })
    for (let index = 0; index < this.state.participatorNum; index++ ) {
      columns.push(
        {
          title: `#${index + 1}`,
          render: (record) => {
            return <span>{record.value[index]}</span>
          },
          key: `score${index + 1}`,
          width: 40
        },
      )
    }
    columns.push(
      { title: '合计', key: 'sum', dataIndex: 'sum' ,width: 50 }
    )
    // this.state.data = [{
    //   key: '1',
    //   id: 'John Brown',
    //   content: 'abc',
    //   score: '1',
    //   sum: '100',
    //   value:[9,8,7,6]
    // }, {
    //   key: '2',
    //   id: 'Jim Green',
    //   content: 'asd',
    //   score: '2',
    //   sum: '101',
    //   value:[9,8,7,6]
    // }, {
    //   key: '3',
    //   id: 'Jim Green',
    //   content: 'asdf',
    //   score: '3',
    //   sum: '104',
    //   value:[9,8,7,6]
    // }, {
    //   key: '4',
    //   id: 'Jim Green',
    //   content: 'asdfsa',
    //   score: '0',
    //   sum: '132',
    //   value:[9,8,7,6]
    // }, {
    //   key: '5',
    //   id: 'Jim Green',
    //   content: 'asdfsafasf',
    //   score: '9',
    //   sum: '200',
    //   value:[9,8,7,6]
    // },
    // ]

    return (
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
  }
}
export default ScoreRes