import React, { Component } from 'react'
import { Table, message } from 'antd'
import Operation from './operation'
import timeTransform from '../../../../utils/timeTransfrom'
import './index.less'

class ActivityList extends Component {
  constructor (props) {
    super(props)
  }

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
            {record.visibility === 1 && '开启'}
            {record.visibility === 0 && '关闭'}
          </span>
        ),
        key: 'visibility'
      },
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
    let {list = []} = this.props
    let listData = list.map((t = {}, i) => ({
      ...t,
      key: i + 1,
    }))

    return (
      <div>
        <Table columns={columns} dataSource={listData} scroll={{x: 1300}} pagination={this.props.pagination} />
      </div>
    )
  }
}

export default ActivityList