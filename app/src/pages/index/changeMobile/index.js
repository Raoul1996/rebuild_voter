import React, { Component } from 'react'
import { Link } from 'react-router'
import {Row,Col} from 'antd'
import './index.less'
import ChangeMobileComponent from '../../../components/user/changeMobile'
import Logo from '../../../components/content/lineText/index'
class ChangeMobile extends Component{
  render() {
    return(
      <div className="msg-mobile-wrapper">
        <Logo text="不洗碗工作室" />
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