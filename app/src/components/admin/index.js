import React, { Component }from 'react'
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
    if (!token) {
      Goto('login')
    }
  }

  componentDidMount () {
    this.isAdminLogin()
  }

  render () {
    return (
      <div className="tabs-warpper">
        <Tabs tabPosition='left'>
          <TabPane tab="活动列表页" key="1"><List /></TabPane>
          <TabPane tab="投票统计页" key="2"><Statistic /></TabPane>
        </Tabs>
      </div>
    )
  }
}

