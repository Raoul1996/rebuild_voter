import React, { Component } from 'react'
import {Link} from 'react-router'
import { Col, Row, Button, Table, Card } from 'antd'
import API from '../../../../../../api'
import * as Request from '../../../../../../utils/request'
import timeTransform from '../../../../../../utils/timeTransfrom'
import './index.less'

let data = []

class ScoreRes extends Component {
  state = {
    voteId: this.props.location.query.voteid,
    optionValue: [1, 2, 3, 4],
    participatorNum: 4,
    data: data,
    title:''
  }

  getRecord = async () => {
    try {
      await Request.tget(API.record.replace(/:voteId/, this.state.voteId), '', {})
        .then( (json) => {
          this.setState({
            optionValue: json.optionValue,
            participatorNum: json.participatorNum,
            title: json.title
          })
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
          this.setState({
            data: data
          })
          console.log(data)
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
    return (
      <Row>
        <Card className="score-wrapper">
          <Col span={22} offset={1}>
            <h1 className="score-title">{this.state.title}</h1>
          </Col>
          <Col span={22} offset={1}>
            {timeTransform(updateTime)}更新
            <Button className="score-button">下载表格</Button>
          </Col>
          <Col span={22} offset={1} className="list-table">
            <Table columns={columns} dataSource={this.state.data} scroll={{x: 1300}} pagination={false}/>
          </Col>
          <Col span={24} offset={21}>
            <Link to="/admin/filter-statistics">
              <Button size="large" type="primary" style={{margin:'20px'}}>返回</Button>
            </Link>
          </Col>
        </Card>
      </Row>
    )
  }
}
export default ScoreRes