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
      {
        title: '活动开始时间',
        render: record => (
          <span>{timeTransform(record.startTime)}</span>
        ),
        key: 'startTime'
      },
      {
        title: '活动结束时间',
        render: record => (
          <span>{timeTransform(record.endTime)}</span>
        ),
        key: 'endTime'
      },
      {
        title: '创建时间',
        render: record => (
          <span>{timeTransform(record.endTime)}</span>
        ),
        key: 'createTime'
      },
      {title: '创建人', dataIndex: 'mobile', key: 'mobile'},
      {
        title: '活动状态',
        render: record => (
          <span>
            {record.flag === 0 && '未开始'}
            {record.flag === 1 && '已开始'}
            {record.flag === 2 && '已结束'}
          </span>
        ),
        key: 'flag'
      },
      {
        title: '开启状态',
        render: record => (
          <span>
            {record.participatorNum === 0 && '开启'}
            {record.participatorNum === 1 && '关闭'}
          </span>
        ),
        key: 'participatorNum'
      },
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

    let {list = []} = this.props
    let listData = list.map((t = {}, i) => ({
      ...t,
      key: i + 1,
    }))

    return (
      <Table columns={columns} dataSource={listData} scroll={{x: 1300}} pagination={this.props.pagination} />
    )
  }
}

export default ActivityList