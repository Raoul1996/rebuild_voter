import React, { Component } from 'react'
import { Link } from 'react-router'
import './index.less'

import {Row,Col} from 'antd'

import Register from '../../../components/user/register'
class UserRegister extends Component {
  render () {
    return (
      <div className="register-page-wrapper">
        <Row className="register">
          <Col span={22} offset={1}>
            <Register/>
          </Col>
        </Row>
      </div>
    )
  }
}
export default UserRegister