/**
 * Created by Pororo on 17/5/14.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'
import {Col,Row,Button} from 'antd'
import Filter from '../../../components/admin/list/filter'
import ActList from '../../../components/admin/list/activityList'

class List extends Component {
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
            <Link to="create">
              <Button style={ButtonStyle}>+创建活动</Button>
            </Link>
          </Col>
          <Col span={22} offset={1} style={ListStyle}>
            <ActList />
          </Col>
        </Row>
      </div>
    )
  }
}
export default List