import React, { Component } from 'react'
import { Tag, Col, Row, Radio, Checkbox, InputNumber, Form, message, Icon } from 'antd'
const RadioGroup = Radio.Group
const FormItem = Form.Item
import FooterButton from './footerbutton'
import * as Request from '../../../utils/request'
import API from '../../../api'

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
    records: [],
    score: [],
    isGoing: this.props.location.query.flag,
    valueDouble: [],
    footMsg: '',
    clickDisable: true,
    max: 0,
    isVoted: 0,
    choose: [],
    singleValue: 0
  }

  needLogin = (e) => {
    e.preventDefault()
    if (!window.localStorage.getItem('user.token') && e.target.nodeName === 'INPUT') {
      message.warning('请登录后再投票')
    }
  }

  onSingleChange = async (e) => {
    const footMsg = `您已选择: 选项${e.target.value - this.state.optionId + 1}`
    await this.setState({
      valueSingle: e.target.value,
      valueSingleCheckedItem: e.target.value - this.state.optionId + 1,
      footMsg: footMsg,
    })
    // console.log(this.state.valueSingle)
  }

  onDoubleChange = async (checkedValues) => {
    const footMsg = `您已选择: ${checkedValues.length}项;最多选${this.state.max}项`
    await this.setState({
      valueDouble: checkedValues,
      footMsg: footMsg
    })
    // console.log(this.state.valueDouble)
  }

  onScoreChange = async () => {
    const footMsg = `${this.state.type === 3 ? '十' : '百'}分制打分；共${this.state.options.length}项需要打分`
    await this.setState({
      footMsg: footMsg
    })
  }

  getVoting = async () => {
    const token = window.localStorage.getItem('user.token')
    if (token) {
      try {
        await Request.tgetUser(API.voteInfo.replace(/voteid/, this.state.voteId), '', {})
          .then((json) => {
            let isVoted = 0
            json.options.map(item => {
              isVoted = item.value + isVoted // 通过相加和判断是否参加过
            }) // 通过所有选项value相加来判断是否参与过投票

            if (json.voteShow.type === 3 || json.voteShow.type === 4) {
              if (json.records.length === 0) {
                isVoted = 0
              }
            }
            this.setState({
              options: json.options,
              max: json.voteShow.max,
              records: json.records || [],
              title: json.voteShow.title,
              type: json.voteShow.type,
              startTime: getLocalTime(json.voteShow.startTime / 1000),
              endTime: getLocalTime(json.voteShow.endTime / 1000),
              optionId: json.options[0].id,
              isVoted: isVoted
            })
            let choose = []
            this.state.options.map((item) => {
              if (item.value > 0) {
                choose.push(item.id)
              }
            })
            this.setState({
              choose: choose,
              singleValue: choose[0]
            })
            if (this.state.isVoted === 0 && this.state.records.length === 0) {
              if (this.state.flag === 0) {
                this.setState({
                  isGoing: '0'
                })
              }
              if (this.state.flag === 1) {
                this.setState({
                  isGoing: '1',
                  isVoted: 0
                })
              }
              if (this.state.flag === 2) {
                this.setState({
                  isGoing: '2',
                  isVoted: 0
                })
              }
              if (this.state.type === 3 || this.state.type === 4) {
                this.onScoreChange()
              }
            } else {
              if (this.state.flag === 1) {
                this.setState({
                  isGoing: '1',
                  isVoted: 1
                })
              }
              if (this.state.flag === 2) {
                this.setState({
                  isGoing: '2',
                  isVoted: 1
                })
              }
            }
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        await Request.get(API.voteInfo.replace(/voteid/, this.state.voteId), '', {})
          .then((json) => {
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
                isVoted: 0
              })
            }
            if (this.state.flag === 2) {
              this.setState({
                isGoing: '2',
                isVoted: 0
              })
            }
            if (this.state.type === 3 || this.state.type === 4) {
              this.onScoreChange()
            }
          })
      } catch (e) {
        console.log(e)
      }
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
        }
        try {
          await Request.tpostUser(API.submitVote.replace(/:voteId/, this.props.location.query.voteid), {records: records})
          this.setState({
            isVoted: 1
          })
          message.success('投票成功')
          window.history.go(0)
        } catch (e) {
          message.error(e)
        }
      }
    })

  }

  componentDidMount () {
    window.scrollTo(0, 0)
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
    const TimeOffsetSpan = {
      offset: 3,
      span: 20
    }
    const MarginStyle = {
      marginTop: '25px',
      fontSize: '0.6rem'
    }
    const status = [
      <Tag color="#2db7f5">未开始</Tag>,
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
                <span style={{fontSize: '15px', color: '#666'}}><Icon type="star-o" />&nbsp;选项{index + 1}</span>
              </Col>
              {
                type === 1 &&
                <Col>
                  <Radio style={radioStyle} value={item.id}><span style={{fontSize: '15px'}}>{item.title}</span></Radio>
                </Col>
              }
              {
                type === 2 &&
                <Col style={MarginStyle}>
                  <Checkbox value={item.id}><span style={{fontSize: '15px'}}>{item.title}</span></Checkbox>
                </Col>
              }
              {
                (type === 3 || type === 4) &&
                <Row>
                  <Col span={15} style={MarginStyle}>
                    <span style={{fontSize: '15px'}}>{item.title}</span>
                  </Col>
                  <Col span={4}>
                    <FormItem>
                      { getFieldDecorator(`value-${index}`)(
                        <InputNumber
                          min={1}
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
    const formItemsVote = this.state.options.map((item, index) => {
      return (
        <Row style={MarginStyle} key={item.id}>
          <Col>
            <Row style={MarginStyle}>
              <Col>
                <span style={{fontSize: '15px'}}><Icon type="star-o" />&nbsp;选项{index + 1}</span>
              </Col>
              {
                type === 1 && <Radio key={index} style={radioStyle} value={item.id} disabled><span
                  style={{fontSize: '15px'}}>{item.title}</span></Radio>
              }
              {
                type === 2 &&
                <div>
                  <Row>
                    <Col span={8}><Checkbox key={index} value={item.id} disabled><span
                      style={{fontSize: '15px'}}>{item.title}</span></Checkbox></Col>
                  </Row>
                </div>
              }
            </Row>
          </Col>
        </Row>
      )
    })
    const formItemsScore = this.state.records.map((item, index) => {
      return (
        <Row key={index} style={MarginStyle}>
          <Col>
            <span style={{fontSize: '15px'}}><Icon type="star-o" />&nbsp;选项{index + 1}</span>
          </Col>
          <Col span={15} style={MarginStyle}>
            <span>{item.title}</span>
          </Col>
          <Col span={4}>
            <FormItem>
              <InputNumber
                defaultValue={item.value}
                disabled
              />
            </FormItem>
          </Col>
        </Row>
      )
    })
    let is_login = window.localStorage.getItem('is_login') || '0'
    return (
      <Form>
        <div style={{marginTop: '80px'}} onChange={this.needLogin}>
          <Row style={MarginStyle}>
            <Col {...GlobalOffsetSpan}>
              <span style={{fontSize: '20px'}}><Icon type="tags" />&nbsp;{this.state.title}</span>
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
              <span style={{fontSize: '15px'}}><Icon type="clock-circle" /> &nbsp;投票时间:</span>
            </Col>
          </Row>
          <Row style={MarginStyle}>
            <Col {...TimeOffsetSpan}>
              <span style={{margin: 0}}><Tag color="#f7c0c6">{this.state.startTime}</Tag>
                <Tag color="#f7c0c6">{this.state.endTime}</Tag></span>
            </Col>
          </Row>
          <div style={{marginLeft: '15vw', marginBottom: '200px'}}>
            { type === 1 && <div>
              {
                this.state.isVoted === 0 ? <RadioGroup onChange={this.onSingleChange}>{formItems}</RadioGroup> :
                  <RadioGroup onChange={this.onSingleChange} value={this.state.singleValue}>{formItemsVote}</RadioGroup>
              }
            </div>
            }
            { type === 2 && <div>
              {
                this.state.isVoted === 0 ? <Checkbox.Group onChange={this.onDoubleChange}>{formItems}</Checkbox.Group> :
                  <Checkbox.Group value={this.state.choose}
                                  onChange={this.onDoubleChange}>{formItemsVote}</Checkbox.Group>
              }
            </div>
            }
            { (type === 3 || type === 4) && <div>
              {
                this.state.isVoted === 0 ? formItems : formItemsScore
              }
            </div>
            }
          </div>
          {
            is_login === '1' &&
            <FooterButton
              isGoing={this.state.isGoing}
              isJoined={this.state.isVoted}
              submitVoting={this.submitVoting}
              footMsg={this.state.footMsg}
              itemNum={(((this.state.valueDouble.length <= this.state.max) && this.state.valueDouble.length) || this.state.valueSingleCheckedItem) || (this.state.type === 3 || this.state.type === 4)}
              // itemNum={|| (this.state.type === 3 || this.state.type === 4)}
              // itemNum={((this.state.valueDouble.length <= this.state.max) && this.state.valueDouble.length || this.state.valueSingleCheckedItem) }
            />
          }
        </div>
      </Form>
    )
  }
}
const WrappedVoting = Form.create()(Voting)
export default WrappedVoting