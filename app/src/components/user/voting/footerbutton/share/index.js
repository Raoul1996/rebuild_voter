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
              <img src="https://zos.alipayobjects.com/rmsportal/WmEzpOsElbbvgmrexFSH.png" alt="icon" />
            </a>
            <span>发送给朋友</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="https://zos.alipayobjects.com/rmsportal/HssPJKvrjEByyVWJIFwl.png" alt="icon" />
            </a>
            <span>新浪微博</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="https://zos.alipayobjects.com/rmsportal/YHHFcpGxlvQIqCAvZdbw.png" alt="icon" />
            </a>
            <span>QQ</span>
          </Col>
          <Col span={4}>
            <a href="">
              <img src="https://zos.alipayobjects.com/rmsportal/LeZNKxCTkLHDWsjFfqqn.png" alt="icon" />
            </a>
            <span>微信好友</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Share