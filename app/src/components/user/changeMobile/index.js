import React, { Component } from 'react'
import {Row,Col} from 'antd'
import './index.less'
import ChangeMobileComponent from '../../../components/user/changeMobile/changeMobileComponent/index'
import Logo from '../../../components/user/content/lineText/index'
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