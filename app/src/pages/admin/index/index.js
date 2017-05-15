import React from 'react'
import { Tabs } from 'antd'
import './index.less'
import List from '../list/index'
import Statistic from '../statistic/index'
const TabPane = Tabs.TabPane
export default () => (
  <div className="tabs-warpper">
    <Tabs tabPosition='left'>
      <TabPane tab="活动列表页" key="1"><List /></TabPane>
      <TabPane tab="投票统计页" key="2"><Statistic /></TabPane>
    </Tabs>
  </div>
)