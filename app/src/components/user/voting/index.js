import React, { Component } from 'react'
import { Tag, Col, Row, Radio, Checkbox, InputNumber, Button, Modal } from 'antd'
const RadioGroup = Radio.Group

import FooterButton from './footerbutton'
import * as Request from '../../../utils/request'
import API from '../../../api'
import Logo from '../content/lineText/index'
import Share from '../share'
function getLocalTime (nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年 | 月/g, '-').replace(/日/g, ' ')
}



class Voting extends Component {
  state = {
    voteId: this.props.location.query.voteid,
    flag: this.props.location.query.flag-1,
    title: '投票',
    value: 1,
    type: 2,
    modal1Visible: false,
    modal2Visible: false,
    startTime: getLocalTime(2494583700),
    endTime: getLocalTime(2494583718),
    options: [],
  }
  onChange = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }
  onSingleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      value: e.target.value,
    })
  }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  onDoubleChange = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }

  getVoting = async () => {
    try {
      await Request.get(API.voteInfo.replace(/voteid/, this.state.voteId), '', {})
        .then( (json) => {
          console.log(json)
          this.setState({
            title: json.voteShow.title,
            type: json.voteShow.type,
            options: json.options,
            startTime: getLocalTime(json.voteShow.startTime / 1000 ),
            endTime: getLocalTime(json.voteShow.endTime / 1000 ),
          })
          console.log(this.state)
        })
      } catch (e) {
      console.log(e)
    }
  }

  componentDidMount () {
    this.getVoting()
  }

  render () {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }
    const GlobalOffsetSpan = {
      offset: 3,
      span: 18
    }
    const MarginStyle = {
      marginTop: '1rem',
      fontSize: '0.6rem'
    }
    const status = [
      <Tag>未开始</Tag>,
      <Tag color="#87d068">进行中</Tag>,
      <Tag color="#f50">已结束</Tag>,
    ]
    const type = this.state.type
    const formItems = this.state.options.map((item, index) => {
      return (
        <Row style={MarginStyle}>
          <Col>
            <Row style={MarginStyle}>
              <Col>
                <h3>选项{index+1}</h3>
              </Col>
              { type === 1 ?
                <Col>
                  <Radio style={radioStyle} value={index+1} onChange={this.onSingleChange}>{item.title}</Radio>
                </Col> : null
              }
              { type === 2 ?
                <Col style={MarginStyle}>
                  <Checkbox value={index+1}>{item.title}</Checkbox>
                </Col> : null
              }
              { type === 3 || type === 4 ?
                <Row>
                  <Col span={18} style={MarginStyle}>
                    <h4>{item.title}</h4>
                  </Col>
                  <Col span={4} offset={2}>
                    <InputNumber />
                  </Col>
                </Row> : null
              }

            </Row>
          </Col>
        </Row>
      )
    })

    return (
      <div>
        <Logo text="不洗碗工作室" />
        <Row style={MarginStyle}>
          <Col {...GlobalOffsetSpan}>
            <h2>{this.state.title}</h2>
          </Col>
        </Row>
        <Row style={MarginStyle}>
          <Col {...GlobalOffsetSpan}>
            {
              status[this.state.flag]
            }
          </Col>
        </Row>
        <Row style={MarginStyle}>
          <Col {...GlobalOffsetSpan}>
            <h4>投票时间:</h4>
          </Col>
        </Row>
        <Row style={MarginStyle}>
          <Col {...GlobalOffsetSpan}>
            <h4 style={{margin: 0}}>{this.state.startTime} &nbsp; 到 &nbsp; {this.state.endTime}</h4>
          </Col>
        </Row>
        <div style={{marginLeft: '15vw'}}>
          { type === 1 ?
            <RadioGroup onChange={this.onChange}>
              {
                formItems
              }
            </RadioGroup> : null
          }
          { type === 2 ?
            <Checkbox.Group onChange={this.onChange}>
              {
                formItems
              }
            </Checkbox.Group> : null
          }
          {/*{*/}
            {/*type === 3 || type === 4 ?*/}

          {/*}*/}
        </div>
        <FooterButton />
        {/*<Share />*/}
      </div>
    )
  }
}


export default Voting