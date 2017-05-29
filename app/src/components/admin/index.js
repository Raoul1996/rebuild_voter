import React, { Component }from 'react'
import {Link} from 'react-router'
import { Tabs } from 'antd'
import './index.less'
import List from './list/filterList'
import Statistic from './list/filterStatistics'
import Goto from '../../utils/goto'
const TabPane = Tabs.TabPane

export default class Index extends Component {
  constructor (props) {
    super(props)
  }

  isAdminLogin = () => {
    const token = window.localStorage.getItem('admin.token')
    let path = window.sessionStorage.getItem('path')
    Goto(path)
    if (!token) {
      Goto('login')
    }
  }

  handleChange = (key) => {
    window.sessionStorage.setItem('path','admin/'+key)
    Goto('admin/'+key)
  }

  componentDidMount () {
    this.isAdminLogin()
  }

  render () {
    return (
      <div className="tabs-wrapper">
        <Tabs tabPosition='left' onTabClick={this.handleChange} activeKey={window.sessionStorage.getItem('path')==='admin/filter-list'?'filter-list':'filter-statistics'}>
          <TabPane tab="活动列表页" key="filter-list"/>
          <TabPane tab="投票统计页" key="filter-statistics"/>
        </Tabs>
        {this.props.children}
      </div>
    )
  }
}

