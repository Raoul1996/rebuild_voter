import React, { Component } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router'
import urlEncoder from '../../../../utils/urlEncoder'
import timeTransform from '../../../../utils/timeTransfrom'
import './index.less'

class ActivityList extends Component {

  render () {

    const columns = [
      {title: 'ID', dataIndex: 'id', key: 'id'},
      {title: '活动名称', dataIndex: 'title', key: 'title'},
      {title: '活动类型', dataIndex: 'type', key: 'type'},
      {title: '活动开始时间', dataIndex: 'startTime', key: 'startTime'},
      {title: '活动结束时间', dataIndex: 'endTime', key: 'endTime'},
      {title: '创建时间', dataIndex: 'createTime', key: 'createTime'},
      {title: '创建人', dataIndex: 'mobile', key: 'mobile'},
      {title: '活动状态', dataIndex: 'flag', key: 'flag'},
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => (
          <Link to={urlEncoder('vote-res', {voteId: record.id})}>
            {(record.type === 3 || record.type === 4) ? '分数统计' : '票数统计'}
          </Link>
        ),
      }
    ]

    const list = [{
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
    return (
      <Table columns={columns} dataSource={list} scroll={{x: 1300}} pagination={{ pageSize: 5 }}/>
    )
  }
}

export default ActivityList