import React, { Component } from 'react'
import { Row, Col, DatePicker, Input, Radio, Button, Card } from 'antd'
import './index.less'
const RadioGroup = Radio.Group

export default class Filter extends Component {
  state = {
    startValueCreate: null,
    endValueCreate: null,
    endOpenCreate: false,
    startValueBegin: null,
    endValueBegin: null,
    endOpenBegin: false,
    radioOne: 1,
    radioTwo: 1
  }
  //单选button
  onChangeRadioOne = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      radioOne: e.target.value,
    })
  }
  onChangeRadioTwo = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      radioTwo: e.target.value,
    })
  }
  //创建日期选择
  disabledStartDateCreate = (startValueCreate) => {
    const endValueCreate = this.state.endValue
    if (!startValueCreate || !endValueCreate) {
      return false
    }
    return startValueCreate.valueOf() > endValueCreate.valueOf()
  }

  disabledEndDateCreate = (endValueCreate) => {
    const startValueCreate = this.state.startValue
    if (!endValueCreate || !startValueCreate) {
      return false
    }
    return endValueCreate.valueOf() <= startValueCreate.valueOf()
  }

  onChangeDateCreate = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChangeCreate = (value) => {
    this.onChangeDateCreate('startValueCreate', value)
  }

  onEndChangeCreate = (value) => {
    this.onChangeDateCreate('endValueCreate', value)
  }

  handleStartOpenChangeCreate = (open) => {
    if (!open) {
      this.setState({endOpenCreate: true})
    }
  }

  handleEndOpenChangeCreate = (open) => {
    this.setState({endOpenCreate: open})
  }

  //开始日期选择
  disabledStartDateBegin = (startValueBegin) => {
    const endValueBegin = this.state.endValue
    if (!startValueBegin || !endValueBegin) {
      return false
    }
    return startValueBegin.valueOf() > endValueBegin.valueOf()
  }

  disabledEndDateBegin = (endValueBegin) => {
    const startValueBegin = this.state.startValue
    if (!endValueBegin || !startValueBegin) {
      return false
    }
    return endValueBegin.valueOf() <= startValueBegin.valueOf()
  }

  onChangeDateBegin = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChangeBegin = (value) => {
    this.onChangeDateBegin('startValueBegin', value)
  }

  onEndChangeBegin = (value) => {
    this.onChangeDateBegin('endValueBegin', value)
  }

  handleStartOpenChangeBegin = (open) => {
    if (!open) {
      this.setState({endOpenBegin: true})
    }
  }

  handleEndOpenChangeBegin = (open) => {
    this.setState({endOpenBegin: open})
  }

  render () {
    const {startValueCreate, endValueCreate, endOpenCreate, startValueBegin, endValueBegin, endOpenBegin} = this.state
    return (
      <Card>
        <Col span={22}>
          <div className='filter'>
            <Row style={{marginTop: 20}}>
              <Col span={20} offset={1}>
                <sapn className='filter-font'>筛选</sapn>
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={22} offset={1}>
                <Col span={2}><span>创建时间</span></Col>
                <Col span={9}>
                  <DatePicker
                    disabledDate={this.disabledStartDateCreate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValueCreate}
                    onChange={this.onStartChangeCreate}
                    onOpenChange={this.handleStartOpenChangeCreate}
                  />
                  <span> ~ </span>
                  <DatePicker
                    disabledDate={this.disabledEndDateCreate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endValueCreate}
                    onChange={this.onEndChangeCreate}
                    open={endOpenCreate}
                    onOpenChange={this.handleEndOpenChangeCreate}
                  />
                </Col>
                <Col span={2}><span>开始时间</span></Col>
                <Col span={9}>
                  <DatePicker
                    disabledDate={this.disabledStartDateBegin}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={startValueBegin}
                    onChange={this.onStartChangeBegin}
                    onOpenChange={this.handleStartOpenChangeBegin}
                  />
                  <span> ~ </span>
                  <DatePicker
                    disabledDate={this.disabledEndDateBegin}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    value={endValueBegin}
                    onChange={this.onEndChangeBegin}
                    open={endOpenBegin}
                    onOpenChange={this.handleEndOpenChangeBegin}
                  />
                </Col>
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={22} offset={1}>
                <Col span={2}><span>活动名称</span></Col>
                <Col span={6}>
                  <Input />
                </Col>
                <Col span={2} offset={3}><span>创建人</span></Col>
                <Col span={6}>
                  <Input />
                </Col>
              </Col>
            </Row>
            <Row style={{marginTop: 20}}>
              <Col span={22} offset={1}>
                <Col span={2}><span>活动状态</span></Col>
                <Col span={7}>
                  <RadioGroup onChange={this.onChangeRadioOne} value={this.state.radioOne}>
                    <Radio value={1}>未开始</Radio>
                    <Radio value={2}>进行中</Radio>
                    <Radio value={3}>已结束</Radio>
                  </RadioGroup>
                </Col>
                <Col span={2} offset={2}><span>开启状态</span></Col>
                <Col span={9}>
                  <RadioGroup onChange={this.onChangeRadioTwo} value={this.state.radioTwo}>
                    <Radio value={1}>已开启</Radio>
                    <Radio value={2}>已关闭</Radio>
                  </RadioGroup>
                </Col>
              </Col>
            </Row>
            <Row style={{marginTop: 20, marginBottom: 50}}>
              <Col offset={1}>
                <Button type="primary">查询</Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Card>
    )
  }
}
