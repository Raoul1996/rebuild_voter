import React, { Component } from 'react'
import { Tag, Col, Row, Radio, Checkbox, InputNumber, Form, message } from 'antd'
const RadioGroup = Radio.Group
const FormItem = Form.Item

import FooterButton from './footerbutton'
import * as Request from '../../../utils/request'
import API from '../../../api'
import Logo from '../content/lineText/index'

function getLocalTime (nS) {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年 | 月/g, '-').replace(/日/g, ' ')
}

class Voting extends Component {
  state = {
    voteId: this.props.location.query.voteid,
    flag: this.props.location.query.flag,
    optionId: 1,
    title: '投票',
    valueSingle: 1,
    type: 2,
    modal1Visible: false,
    modal2Visible: false,
    startTime: getLocalTime(2494583700),
    endTime: getLocalTime(2494583718),
    options: [],
    score: [],
    isGoing: this.props.location.query.flag,
    isJoined: '0',
    valueDouble: [],
    footMsg: '',
    clickDisable: true
  }

  onSingleChange = (e) => {
    console.log('radio checked', e.target.value)
    const footMsg = `您已选择: 选项${e.target.value - this.state.optionId + 1}`
    this.setState({
      valueSingle: e.target.value,
      valueSingleCheckedItem: e.target.value - this.state.optionId + 1,
      footMsg: footMsg,
    })
  }

  onDoubleChange = (checkedValues) => {
    // console.log('checked = ', checkedValues.length)
    const footMsg = `您已选择: ${checkedValues.length}项`
    // 这里是状态不好且不是很懂业务逻辑的宝大人写的，看的时候请务必小心
    // if (checkedValues.length !== 0) {
    //   this.setState({
    //     clickDisable: false
    //   })
    //   console.log('voting line 53')
    //   console.log(this.state.clickDisable)
    // }
    // END
    this.setState({
      valueDouble: checkedValues,
      footMsg: footMsg
    })
  }

  getVoting = async () => {
    try {
      await Request.get(API.voteInfo.replace(/voteid/, this.state.voteId), '', {})
        .then((json) => {
          console.log(json)
          this.setState({
            title: json.voteShow.title,
            type: json.voteShow.type,
            options: json.options,
            startTime: getLocalTime(json.voteShow.startTime / 1000),
            endTime: getLocalTime(json.voteShow.endTime / 1000),
            optionId: json.options[0].id
          })
          if (this.state.flag === 0) {
            this.setState({
              isGoing: '0'
            })
          }
          if (this.state.flag === 1) {
            this.setState({
              isGoing: '1',
              isJoined: '0'
            })
          }
          if (this.state.flag === 2) {
            this.setState({
              isGoing: '2',
              isJoined: '0'
            })
          }
        })
    } catch (e) {
      console.log(e)
    }
  }

  submitVoting = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let records = []
        if (this.state.type === 1) {
          records.push({
            'optionId': this.state.valueSingle,
            'voteId': parseInt(this.props.location.query.voteid),
            'type': this.state.type
          })
        }
        if (this.state.type === 2) {
          this.state.valueDouble.forEach(key => {
            let item =
              {
                'optionId': key,
                'voteId': parseInt(this.props.location.query.voteid),
                'type': this.state.type
              }
            records.push(item)
          })
        }
        if (this.state.type === 3 || this.state.type === 4) {
          Object.keys(values).forEach(key => {
            let item =
              {
                'optionId': this.state.optionId++,
                'voteId': parseInt(this.props.location.query.voteid),
                'type': this.state.type,
                'value': values[key]
              }
            records.push(item)
          })
          let body = {
            'records': records
          }
          this.setState({
            body: body
          })
        }
        console.log(this.state.body)
        try {
          await Request.tpostUser(API.submitVote.replace(/:voteId/, this.props.location.query.voteid), {records: records})
            .then((json) => {
              console.log(json)
            })
          this.setState({
            isJoined: '1'
          })
        } catch (e) {
          message.error(e)
        }
      }
    })

  }

  componentDidMount () {
    this.getVoting()
  }

  render () {
    const {getFieldDecorator} = this.props.form
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
        <Row style={MarginStyle} key={item.id}>
          <Col>
            <Row style={MarginStyle}>
              <Col>
                <h3>选项{index + 1}</h3>
              </Col>
              { type === 1 && <Col><Radio style={radioStyle} value={item.id}>{item.title}</Radio></Col> }
              { type === 2 && <Col style={MarginStyle}><Checkbox value={item.id}>{item.title}</Checkbox></Col> }
              { (type === 3 || type === 4) &&
              <Row>
                <Col span={15} style={MarginStyle}>
                  <h4>{item.title}</h4>
                </Col>
                <Col span={4}>
                  <FormItem>
                    { getFieldDecorator(`value-${index}`)(
                      <InputNumber
                        min={0}
                        max={type === 3 ? 10 : 100}
                      />
                    )}
                  </FormItem>
                </Col>
              </Row>
              }
            </Row>
          </Col>
        </Row>
      )
    })

    return (
      <Form>
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
          <div style={{marginLeft: '15vw', marginBottom: '100px'}}>
            { type === 1 && <RadioGroup onChange={this.onSingleChange}>{formItems}</RadioGroup> }
            { type === 2 && <Checkbox.Group onChange={this.onDoubleChange}>{formItems}</Checkbox.Group> }
            { (type === 3 || type === 4) && formItems }
          </div>
          <FooterButton
            isGoing={this.state.isGoing}
            isJoined={this.state.isJoined}
            submitVoting={this.submitVoting}
            footMsg={this.state.footMsg}
            itemNum={(this.state.valueDouble.length || this.state.valueSingleCheckedItem) || 0}
          />
        </div>
      </Form>
    )
  }
}
const WrappedVoting = Form.create()(Voting)
export default WrappedVoting