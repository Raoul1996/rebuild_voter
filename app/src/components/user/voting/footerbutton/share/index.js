/**
 * Created by Pororo on 17/5/14.
 */
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
class Share extends Component {
  render () {
    return (
      <div className="share">
        <Row type="flex" justify="space-around" align="middle">
          <Col span={4}>
            <a href="">
              <img src="" alt="" />
            </a>
            <span>生成二维码</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="" alt="" />
            </a>
            <span>分享到</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="" alt="" />
            </a>
            <span>分享到</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="" alt="" />
            </a>
            <span>分享到</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="" alt="" />
            </a>
            <span>分享到</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Share