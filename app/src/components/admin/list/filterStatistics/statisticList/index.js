import React, { Component } from 'react'
import { Table,Tag } from 'antd'
import { Link } from 'react-router'
import urlEncoder from '../../../../../utils/urlEncoder'
import timeTransform from '../../../../../utils/timeTransfrom'
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
            {record.flag === 0 && <Tag color="cyan">未开始</Tag>}
            {record.flag === 1 && <Tag color="blue">进行中</Tag>}
            {record.flag === 2 && <Tag color="orange">已结束</Tag>}
          </span>
        ),
        key: 'flag'
      },
      {
        title: '开启状态',
        render: record => (
          <span>
            {record.visibility === 1 && <Tag color="blue">开启</Tag>}
            {record.visibility === 0 && <Tag color="orange">关闭</Tag>}
          </span>
        ),
        key: 'visibility'
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => (
          <sapn>
            {(record.type === 3 || record.type === 4) ?
              <Link to={urlEncoder('score-res', {voteid: record.id})}>分数统计</Link>:
              <Link to={urlEncoder('vote-res', {voteid: record.id})}>票数统计</Link>
            }
          </sapn>
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