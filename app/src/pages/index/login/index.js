import React, { Component } from 'react'
import {Col, Row} from 'antd'
import './index.less'
import Header from '../../../components/content/header/index'
import Footer from '../../../components/content/footer/index'
import Login from '../../../components/user/login/index'
import Logo from '../../../components/content/lineText/index'

const title = '登录'
class UserPages extends Component {
  render () {
    return (
      <div className="login-page-wrapper">
        {/*<Header />*/}
        {/*<Logo />*/}
        {/*{this.props.children}*/}
        {/*<div className="login-wrapper">*/}
        <Row className="login-wrapper">
          <Col span={22} offset={1}>
            <Login title={title} className="login" />
          </Col>
        </Row>
        {/*</div>*/}
        {/*<Footer />*/}
      </div>
    )
  }
}
export default UserPages

