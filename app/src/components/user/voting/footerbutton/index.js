/**
 * Created by Pororo on 17/5/14.
 */
import React, { Component } from 'react'
import { Col, Row, Button, Alert, message, Modal } from 'antd'
import Goto from '../../../../utils/goto'
import './index.less'
import Share from '../../share'
function confirm () {
  message.info('Click on Yes.')
}

class FooterButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_vote: 0,
      visibleShare: false,
      visibleSubmit: false,
      modal2Visible: false,
    }
  }

  watchMore = () => {
    Goto('users/list')
    window.localStorage.setItem('is_vote', '0')
  }

  setModal2Visible (modal2Visible) {
    this.setState({modal2Visible})
  }

  showSubmitModal = () => {
    this.setState({
      visibleSubmit: true,
    })
  }

  handleSubmitOk = (e) => {
    console.log(e)
    this.setState({
      visibleSubmit: false,
    })
  }
  handleSubmitCancel = (e) => {
    console.log(e)
    this.setState({
      visibleSubmit: false,
    })
  }

  render () {
    const {isGoing,isJoined} = this.props
    return (
      <div className="footer-buttons">
        <div>
          <Row >
            {
              isGoing === '0' &&
              <Col span={22} offset={1}>
                <Button size="large" style={{width: '100%'}} onClick={() => this.setModal2Visible(true)}>
                  分享
                </Button>
                <Modal
                  title="分享"
                  wrapClassName="vertical-center-modal"
                  visible={this.state.modal2Visible}
                  onOk={() => this.setModal2Visible(false)}
                  onCancel={() => this.setModal2Visible(false)}
                  footer={null}
                >
                  <Share sites={['qzone', 'weibo', 'qq', 'wechat']}
                         url="https://github.com/DawnyWu/react-share-buttons"
                         title="react-share-buttons"
                         description="一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+ 的 react 组件"
                  />
                </Modal>
              </Col>
            }
            {
              (isGoing === '1' && isJoined === '0') &&
              <div>
                <Row>
                  <Col span={24}>
                    <Alert message="您已选择" type="warning" />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Button size="large" style={{width: '95%'}} onClick={this.showSubmitModal}>确认投票</Button>
                    <Modal
                      title="确认提交"
                      wrapClassName="vertical-center-modal"
                      visible={this.state.visibleSubmit}
                      onOk={this.handleSubmitOk}
                      onCancel={this.handleSubmitCancel}
                    />
                  </Col>
                  <Col span={12}>
                    <Button size="large" style={{width: '95%'}} onClick={() => this.setModal2Visible(true)}>
                      分享
                    </Button>
                    <Modal
                      title="分享"
                      wrapClassName="vertical-center-modal"
                      visible={this.state.modal2Visible}
                      onOk={() => this.setModal2Visible(false)}
                      onCancel={() => this.setModal2Visible(false)}
                      footer={null}
                    >
                      <Share sites={['qzone', 'weibo', 'qq', 'wechat']}
                             url="https://github.com/DawnyWu/react-share-buttons"
                             title="react-share-buttons"
                             description="一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+ 的 react 组件"
                      />
                    </Modal>
                  </Col>
                </Row>
              </div>
            }
            {
              (isGoing === '1' && isJoined === '1') &&
              <div>
                <Row>
                  <Col span={12}>
                    <Button size="large" style={{width: '100%'}} onClick={this.watchMore}>
                      返回查看更多投票
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="large" style={{width: '95%'}} onClick={() => this.setModal2Visible(true)}>
                      分享
                    </Button>
                    <Modal
                      title="分享"
                      wrapClassName="vertical-center-modal"
                      visible={this.state.modal2Visible}
                      onOk={() => this.setModal2Visible(false)}
                      onCancel={() => this.setModal2Visible(false)}
                    >
                      <Share />
                    </Modal>
                  </Col>
                </Row>
              </div>
            }
            {
              isGoing === '2' &&
              <Col span={22} offset={1}>
                <Button size="large" style={{width: '100%'}} onClick={this.watchMore}>
                  返回查看更多投票
                </Button>
              </Col>
            }
          </Row>
        </div>
        <Row>
        </Row>
      </div>
    )
  }
}

export default FooterButton