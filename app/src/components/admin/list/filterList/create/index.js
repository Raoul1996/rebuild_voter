import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Input, DatePicker, Radio, Form, Icon, Button, Card, InputNumber, message } from 'antd'
import './index.less'
import API from '../../../../../api'
import * as Request from '../../../../../utils/request'
import Goto from '../../../../../utils/goto'
const RadioGroup = Radio.Group
const FormItem = Form.Item

let uuid = 0
class Create extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
    type: 1
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
    this.onChange('startValue', value)
  }

  onEndChange = (value) => {
    this.onChange('endValue', value)
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true})
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open})
  }
  //选项添加
  remove = (k) => {
    const {form} = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  add = () => {
    uuid++
    console.log(uuid)
    const {form} = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
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
        console.log(new Date(Date.parse(new Date)))
        console.log(new Date(Date.parse(new Date) + 1000))
        const {title, max} = values
        const body = {
          options: options,
          title: title,
          startTime: Date.parse(this.state.startValue) < Date.parse(new Date) ? Date.parse(new Date) + 1000 : Date.parse(this.state.startValue), // TODO: 创建时间延迟
          endTime: Date.parse(this.state.endValue),
          type: parseInt(this.state.type),
          max: parseInt(max)
        }
        console.log(body)

        try {
          await Request.tpost(API.create, body)
          message.success('创建成功')
          setTimeout(Goto('/admin'),1000)
        } catch (e) {
          console.log(e)
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

  componentDidMount () {
    uuid = 0
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
    getFieldDecorator('keys', {initialValue: []})
    const keys = getFieldValue('keys')
    const formItems = keys.map((index) => {
      return (
        <FormItem
          {...formItemLayoutWithOutLabel}
          label={`选项${index}`}
          required={false}
          key={index}
        >
          {getFieldDecorator(`names-${index}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入选项内容或者删除该选项',
            }],
          })(
            <Input placeholder="请输入选项" style={{width: '60%', marginRight: 8}} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(index)}
          />
        </FormItem>
      )
    })

    return (
      <div className="edit">
        <Col offset={3} span={18}>
        <Card className="card">
        <Col>
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
                      value={startValue}
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
                      value={endValue}
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
                        })(
                          <InputNumber min={1} max={10} />
                        )}
                      </FormItem>
                    </Col>
                  </Col>
                </Row>
              }
              {
                this.state.type > 2 &&
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
                      <Col offset={5}>
                        <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                          <Icon type="plus" /> 添加选项
                        </Button>
                      </Col>
                    </FormItem>
                    <FormItem {...formItemLayoutWithOutLabel}>
                      <Col span={20} offset={5}>
                        <Button type="primary" htmlType="submit" size="large" style={{marginRight: '20px'}}>新建</Button>
                        <Link to="/admin/filter-list">
                          <Button size="large">返回</Button>
                        </Link>
                      </Col>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
            </Col>
        </Col>
        </Card>
        </Col>
      </div>
    )
  }
}

export default Create = Form.create()(Create)