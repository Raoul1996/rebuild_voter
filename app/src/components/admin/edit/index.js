import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Input, DatePicker, Radio, Form, Icon, Button, Card, InputNumber, message } from 'antd'
import moment from 'moment'
import './index.less'
import API from '../../../api'
import * as Request from '../../../utils/request'
const RadioGroup = Radio.Group
const FormItem = Form.Item

let uuid = 0
class Edit extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    startTime: null,
    endTime: null,
    type: 4,
    options:[{value: '你好',id:1}, {value:'大家好',id:2},{value:'才是真的好',id:3}],
    max:4
  }

  getVote = async () => {
    try {
      await Request.tget(API.singleInfo, 'voteId', headers)
    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount () {
    // const data = this.getVote()
    const {form} = this.props
    // const {voteShow = {title:'啦啦啦',startTime:1490427181000,endTime:1490427183000,type:4,max:4}, options = []} = data
    // this.setState={
    //   options: options,
    //   type:voteShow.type
    // }
    form.setFieldsValue({
      title: 'lalala',
      typeOne:this.state.type !==5?this.state.type:5,
      typeTwo:(this.state.type !==1||this.state.type !== 2)?4:0
    })
  }

  //日期选择框
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue
    if (!startValue || !endValue) {
      return false
    }
    return startValue.valueOf() > endValue.valueOf()
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue
    if (!endValue || !startValue) {
      return false
    }
    return endValue.valueOf() <= startValue.valueOf()
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    this.onChange('startTime', value)
  }

  onEndChange = (value) => {
    this.onChange('endTime', value)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true})
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let options = []
        Object.keys(values).forEach(key => {
          if (key.match(/^name?/)) {
            let item = values[key]
            options.push(item)
          }
        })
        const {title, max} = values
        const body = {
          options: options,
          title: title,
          startTime: Date.parse(this.state.startTime),
          endTime: Date.parse(this.state.endTime),
          type: parseInt(this.state.type),
          max: parseInt(max)
        }
        console.log(body)

        const token = window.localStorage.getItem('admin.token')
        try {
          await Request.tpost(API.singleInfo, token, body)
          message.success('修改成功')
        } catch (e) {
          message.error('创建失败')
        }
      }
    })
  }

  //类型选择
  onTypeChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      type: e.target.value,
    })
  }

  render () {
    //日期选择
    const {startValue, endValue, endOpen} = this.state
    //选项添加
    const {getFieldDecorator, getFieldValue} = this.props.form
    const GlobalSpanOffset = {
      span: 22,
      offset: 9
    }
    const TitleSpanOffset = {
      span: 3,
      offset: 0
    }
    const InputSpanOffset = {
      span: 7,
      offset: 1
    }
    getFieldDecorator('keys', {initialValue: this.state.options})
    const keys = getFieldValue('keys')
    const formItemLayoutWithOutLabel = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 2},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 11, offset: 1},
      },
    }
    const formItems = keys.map((k) => {
      return (
        <FormItem
          {...formItemLayoutWithOutLabel}
          label={`选项${k}`}
          required={false}
          key={k.id}
        >
          {getFieldDecorator(`names-${k.id}`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: k.value,
            rules: [{
              required: true,
              whitespace: true,
              message: '选项内容不为空',
            }],
          })(
            <Input placeholder="请输入选项" style={{width: '60%', marginRight: 8}} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
          />
        </FormItem>
      )
    })

    return (
      <div className="edit">
        <Col offset={5} span={14}>
          <Card className="card">
            <Col span={20}>
              <Row style={{marginTop: '20px'}}>
                <Col {...GlobalSpanOffset}>
                  <Col {...TitleSpanOffset}><span>活动名称</span></Col>
                  <Col {...InputSpanOffset}>
                    <FormItem>
                      {getFieldDecorator('title', {
                        rules: [{required: true, message: '请输入活动名称'}],
                      })(
                        <Input placeholder="活动名称" />
                      )}
                    </FormItem>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col {...GlobalSpanOffset}>
                  <Col {...TitleSpanOffset}><span>开始时间</span></Col>
                  <Col span={10} offset={1}>
                    <DatePicker
                      disabledDate={this.disabledStartDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      defaultValue={moment('2015-06', 'YYYY-MM')}
                      placeholder="开始时间"
                      onChange={this.onStartChange}
                      onOpenChange={this.handleStartOpenChange}
                    />
                  </Col>
                </Col>
              </Row>
              <Row style={{marginTop: '20px'}}>
                <Col {...GlobalSpanOffset}>
                  <Col {...TitleSpanOffset}><span>结束时间</span></Col>
                  <Col span={10} offset={1}>
                    <DatePicker
                      disabledDate={this.disabledEndDate}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      defaultValue={moment('2015-06', 'YYYY-MM')}
                      placeholder="结束时间"
                      onChange={this.onEndChange}
                      open={endOpen}
                      onOpenChange={this.handleEndOpenChange}
                    />
                  </Col>
                </Col>
              </Row>
              <Row style={{marginTop: '20px'}}>
                <Col {...GlobalSpanOffset}>
                  <Col {...TitleSpanOffset}><span>投票形式</span></Col>
                  <Col span={10} offset={1}>
                    <FormItem>
                      {getFieldDecorator('typeOne', {
                        rules: [{required: true, message: '请选择投票类型'}],
                      })(
                        <RadioGroup onChange={this.onTypeChange}>
                          <Radio value={1}>单选</Radio>
                          <Radio value={2}>多选</Radio>
                          <Radio value={5}>打分</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                  </Col>
                </Col>
              </Row>
              {
                this.state.type === 2 &&
                <Row>
                  <Col {...GlobalSpanOffset}>
                    <Col {...TitleSpanOffset}><span>最多选择</span></Col>
                    <Col {...InputSpanOffset}>
                      <FormItem>
                        {getFieldDecorator('max', {
                          rules: [{required: true, message: '请选择最多选择数'}],
                          initialValue:this.state.max
                        })(
                          <InputNumber />
                        )}
                      </FormItem>
                    </Col>
                  </Col>
                </Row>
              }
              {
                (this.state.type === 5||this.state.type === 3||this.state.type === 4) &&
                <Row>
                  <Col {...GlobalSpanOffset}>
                    <Col {...TitleSpanOffset}><span>分数上额</span></Col>
                    <Col span={10} offset={1}>
                      <FormItem>
                        {getFieldDecorator('typeTwo', {
                          rules: [{required: true, message: '请选择分数上限'}],
                        })(
                          <RadioGroup onChange={this.onTypeChange}>
                            <Radio value={3}>十分制</Radio>
                            <Radio value={4}>百分制</Radio>
                          </RadioGroup>
                        )}
                      </FormItem>
                    </Col>
                  </Col>
                </Row>
              }
              <Row>
                <Col {...GlobalSpanOffset}>
                  <Form onSubmit={this.handleSubmit}>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                      <Col span={20} offset={5}>
                        <Button type="primary" htmlType="submit" size="large" style={{marginRight: '20px'}}>保存修改</Button>
                        <Link to="admin">
                          <Button size="large">返回</Button>
                        </Link>
                      </Col>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Card>
        </Col>
      </div>
    )
  }
}

export default Edit = Form.create()(Edit)