import React, { Component } from 'react'
import {Link} from 'react-router'
import { Col, Row, Button, Table, Card, message } from 'antd'
import timeTransform from '../../../../../../utils/timeTransfrom'
import API from '../../../../../../api'
import getAdminToken from '../../../../../../utils/getTokenAdmin'

const updateTime = new Date().getTime()
import './index.less'

const MarginStyle = {
  marginTop: '20px',
  fontSize: '15px'
}

export default class VoteRes extends Component {

  constructor (props) {
    super(props)
    this.state = {
      options: [],
      title: ''
    }
  }

  getVoteRes = () => {
    fetch(API.record.replace(/:voteId/, this.props.location.query.voteid), {
      method: 'GET',
      headers: {
        token: getAdminToken()
      }
    }).then((res) => {
      return res.json()
    }).then((json) => {
      if (json.code === 0) {
        this.setState({
          options: json.data.options,
          title: json.data.vote.title
        })
      }
    })
  }

  download = async() => {
    fetch(API.download.replace(/:voteId/, this.props.location.query.voteid), {
      method: 'GET',
      headers: {
        'Content-Type':'application/force-download',
        'token': getAdminToken()
      }
    }).then(res => res.blob().then(blob => {
      let a = document.createElement('a')
      let url = window.URL.createObjectURL(blob)
      let filename = this.props.location.query.voteid + this.state.title + '.xls'
      a.download = filename
      a.href = url
      a.click()
      window.URL.revokeObjectURL(url)
    }))
  }

  componentDidMount () {
    this.getVoteRes()
  }

  render () {
    const columns = [
      {title: '选项序号', width: '14%', dataIndex: 'id', key: 'id'},
      {title: '选项内容', width: '70%', dataIndex: 'title', key: 'title'},
      {title: '数量', width: '8%', dataIndex: 'num', key: 'num'},
      {title: '占比', width: '8%',
        render:record=>(
          <span>
            {record.value}%
          </span>
        ),
        key: 'value'
      }
    ]

    return (
      <Row>
        <Card className="vote-wrapper">
          <Col span={22} offset={1}>
            <h1 className="vote-title">{this.state.title}</h1>
          </Col>
          <Col span={22} offset={1} style={MarginStyle}>
            <Col span={22}>{timeTransform(updateTime)}更新</Col>
            <Button className="vote-button" onClick={this.download}>下载表格</Button>
          </Col>
          <Col span={22} offset={1} className="list-table">
            <Table columns={columns} dataSource={this.state.options} scroll={{x: 1000}} pagination={false}/>
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