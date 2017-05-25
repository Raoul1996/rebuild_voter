import React, { Component } from 'react'
import { Col, Row, Button, Table, Card, message } from 'antd'
import timeTransform from '../../../../../../utils/timeTransfrom'
import API from '../../../../../../api'
import getAdminToken from '../../../../../../utils/getTokenAdmin'
import Goto from '../../../../../../utils/goto'

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
    fetch(API.voteStatistics.replace(/:voteid/, this.props.location.query.voteid), {
      method: 'GET',
      headers: {
        token: getAdminToken()
      }
    }).then((res) => {
      return res.json()
    }).then((json) => {
      if (json.code === 0) {
        message.success('获取详情成功')
        this.setState({
          options: json.data.options,
          title: json.data.title
        })
      }
    })
  }

  download = () => {
    fetch(API.downLoad.replace(/:voteid/, this.props.location.query.voteid), {
      method: 'GET',
      headers: {
        token: getAdminToken()
      }
    }).then((res) => {
      return res.json()
    }).then((json) => {
      if (json.code === 0) {
        message.success('下载成功')
        window.location.href = 'http://192.168.1.219/' + json.data.path
      }
    })
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
            <Table columns={columns} dataSource={this.state.options} scroll={{x: 1300}} />
          </Col>
        </Card>
      </Row>
    )
  }
}