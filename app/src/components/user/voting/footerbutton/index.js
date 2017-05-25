/**
 * Created by Pororo on 17/5/14.
 */
import React,{Component} from 'react'
import { Col, Row, Button, Alert, Popconfirm, message } from 'antd'
import eventProxy from '../../../../utils/eventProxy'
import './index.less'

function confirm () {
  message.info('Click on Yes.')
}

class FooterButton extends Component{
  constructor (props){
    super(props)
    this.state={
      loginStatus: 10
    }
  }

  componentDidMount () {
    eventProxy.on('loginStatus', (loginStatus) => {
      this.state.loginStatus = loginStatus
    })
  }

  render(){
    return (
      <div className="footer-buttons">
        {
          this.state.loginStatus===3&&
            <div>
              <Row>
                <Col span={24}>
                  <Alert message="Warning Text" type="warning" />
                </Col>
              </Row>
              <Row >
                <Col span={12}>
                  <Popconfirm placement="bottom" title="选项" onConfirm={confirm} okText="查看更多活动" cancelText="分享">
                    <Button type="primary" size="large" style={{width: '95%'}}>确认投票</Button>
                  </Popconfirm>
                </Col>
                <Col span={12}>
                  <Button size="large" style={{width: '95%'}}>
                    分享
                  </Button>
                </Col>
              </Row>
            </div>
        }

        <Row>
          <Col span={22} offset={1}>
            <Button size="large" style={{width: '100%'}}>
              返回查看更多投票
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FooterButton