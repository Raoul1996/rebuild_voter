/**
 * Created by Pororo on 17/5/14.
 */
import React, { Component } from 'react'
import { Col, Row, Button, Alert, Modal } from 'antd'
import Goto from '../../../../utils/goto'
import './index.less'
import Share from '../../share'
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
    e.preventDefault()
    this.props.submitVoting()
    this.setState({
      visibleSubmit: false,
    })
  }
  handleSubmitCancel = () => {
    this.setState({
      visibleSubmit: false,
    })
  }

  render () {
    const {isGoing, isJoined, footMsg, itemNum} = this.props
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
                         url={window.location.href}
                         title="react-share-buttons"
                         description="快来参加投票"
                  />
                </Modal>
              </Col>
            }
            {
              (isGoing === '1' && isJoined === '0') &&
              <div>
                <Row>
                  <Col span={24}>
                    <Alert message={footMsg} type="warning" />
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    {/*disable 属性的添加由状态不好且编码能力不佳的Raoul所添加*/}
                    <Button
                      size="large"
                      style={{width: '95%'}}
                      onClick={this.showSubmitModal}
                      disabled={!itemNum}
                    >
                      确认投票
                    </Button>
                    <Modal
                      title="确认提交"
                      wrapClassName="vertical-center-modal"
                      visible={this.state.visibleSubmit}
                      onOk={this.handleSubmitOk}
                      onCancel={this.handleSubmitCancel}
                    >
                      <p>{footMsg}</p>
                    </Modal>
                  </Col>
                  <Col span={12}>
                    <Button
                      size="large"
                      style={{width: '95%'}}
                      onClick={() => this.setModal2Visible(true)}
                    >
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
                             url={window.location.href}
                             title="react-share-buttons"
                             description="快来参加投票"
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
                      <Share sites={['qzone', 'weibo', 'qq', 'wechat']}
                             url={window.location.href}
                             title="react-share-buttons"
                             description="快来参加投票"
                      />
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