import React,{Component} from 'react'
import { Col, Row, Button } from 'antd'
import Filter from '../../../components/admin/list/filter'
import StaList from '../../../components/admin/list/statisticList'
import './index.less'
const updateTime = new Date().getTime()

class Statistics extends Component {
  render(){
    const ListStyle = {
      // background: 'rgb(240,20,20)',
      textAlign: 'center',
      marginTop: '20px'
    }
    const MarginStyle = {
      marginTop: '20px'
    }
    const ButtonStyle = {
      float: 'right'
    }
    return(
      <div>
        <Row>
          <Col span={22} offset={1} style={MarginStyle}>
            <Filter />
          </Col>
          <Col span={22} offset={1} style={ListStyle}>
            <StaList />
          </Col>
        </Row>
      </div>
    )
  }
}
export default Statistics