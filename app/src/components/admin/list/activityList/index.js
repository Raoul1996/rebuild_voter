import React, { Component } from 'react'
import { Table } from 'antd'
import Operation from './operation'
import timeTransform from '../../../../utils/timeTransfrom'
import API from '../../../../api'
import * as Request from '../../../../utils/request'
import './index.less'

class ActivityList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pageSize: 3,
      total: 10,
      list: [{
        id: 68,
        title: 'Test4121',
        startTime: timeTransform(1494701083985),
        endTime: timeTransform(1494701083999),
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test412',
        startTime: timeTransform(1494701083985),
        endTime: timeTransform(1494701083999),
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test412131',
        startTime: timeTransform(1494701083985),
        endTime: timeTransform(1494701083999),
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test',
        startTime: timeTransform(1494701083985),
        endTime: timeTransform(1494701083999),
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }]

    }
  }

  getFirstPage = async () => {
    let params = {
      page: 1,
      row: 6
    }
    // const json = await Request.tget(API.pageInfo,params)
    fetch(API.pageInfo + '?' + 'page=1' + '&' + 'row=6', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': '67d6cdb8519a49edbfb8c2cdd9841119'
        }
      }).then((res) => {
      return res.json()
    }).then((json) => {
        if (json.code === 0) {
          message.success('投票获取成功')
          this.setState({
            total: json.data.total,
            list: json.data.list,
            pageSize: json.data.pageSize
          })
        }
      }
      )
  }

componentDidMount()
{
  this.getFirstPage()
}

render()
{
  const columns = [
    {title: 'id', dataIndex: 'id', key: 'id'},
    {title: '活动名称', dataIndex: 'title', key: 'title'},
    {title: '活动开始时间', dataIndex: 'startTime', key: 'startTime'},
    {title: '活动结束时间', dataIndex: 'endTime', key: 'endTime'},
    {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
    {title: '创建人', dataIndex: 'mobile', key: 'mobile'},
    {title: '活动状态', dataIndex: 'flag', key: 'flag'},
    {title: '开启状态', dataIndex: 'participatorNum', key: 'participatorNum'},
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record, index) => (
        <Operation voteId={record.id} />
      ),
    }
  ]
// 接口获取的时间戳需转换为时间格式

  window.sessionStorage.setItem('current', 1)

  const pagination = {
    pageSize: this.state.pageSize,
    current: Number(window.sessionStorage.getItem('current')),
    total: this.state.total,
    onChange: async (current) => {
      let params = {
        page: current,
        row: 6
      }
      window.sessionStorage.setItem('current', current)
      const json = await Request.tget(API.pageInfo, params)
      this.setState({
        total: json.data.total,
        list: json.data.list
      })
    }
  }

  return (
    <div>
      <Table columns={columns} dataSource={this.state.list} scroll={{x: 1300}} pagination={pagination} />
    </div>
  )
}
}

export default ActivityList