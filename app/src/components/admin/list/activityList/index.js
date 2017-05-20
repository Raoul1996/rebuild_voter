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
  }

  // getAllVote=async () => {
  //   await
  // }

  render () {
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
        render: (text, record,index) => (
          <Operation voteId={record.id}/>
        ),
      }
    ]
// 接口获取的时间戳需转换为时间格式
    const list = [{
      id:68,
      title: 'Test4121',
      startTime: timeTransform(1494701083985),
      endTime: timeTransform(1494701083999),
      type: 2,
      max: 3,
      mobile: '13257300865',
      participatorNum: 0,
      flag: 2
    }, {
      id:68,
      title: 'Test412',
      startTime: timeTransform(1494701083985),
      endTime: timeTransform(1494701083999),
      type: 2,
      max: 3,
      mobile: '13257300865',
      participatorNum: 0,
      flag: 2
    }, {
      id:68,
      title: 'Test412131',
      startTime: timeTransform(1494701083985),
      endTime: timeTransform(1494701083999),
      type: 2,
      max: 3,
      mobile: '13257300865',
      participatorNum: 0,
      flag: 2
    }, {
      id:68,
      title: 'Test',
      startTime: timeTransform(1494701083985),
      endTime: timeTransform(1494701083999),
      type: 2,
      max: 3,
      mobile: '13257300865',
      participatorNum: 0,
      flag: 2
    }]

    const pagination = {
      pageSize:4,
      total:10,
      onClick: async (currentPage) => {
        await Request.tget(API.pageInfo,)
      }
    }
    return (
      <div>
        <Table columns={columns} dataSource={list} scroll={{x: 1300}} pagination={pagination}/>
      </div>
    )
  }
}

export default ActivityList