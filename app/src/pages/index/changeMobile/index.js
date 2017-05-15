import React, { Component } from 'react'
import { Link } from 'react-router'
import {Row,Col} from 'antd'
import './index.less'
import ChangeMobileComponent from '../../../components/user/changeMobile'

class ChangeMobile extends Component{
  render() {
    return(
      <div className="msg-mobile-wrapper">
        <Row className="register">
          <Col span={22} offset={1}>
            <ChangeMobileComponent/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default ChangeMobile