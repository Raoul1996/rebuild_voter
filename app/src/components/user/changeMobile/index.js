import React, { Component } from 'react'
import { Link } from 'react-router'
import './index.less'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message } from 'antd'
const FormItem = Form.Item
import * as Reqest from '../../../utils/request'
import API from '../../../api'
import goto from '../../../utils/goto'
import eventProxy from '../../../utils/eventProxy'
class change extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  componentDidMount () {
    this.setValue()
  }

  setValue () {
    const form = this.props.form
    const oldmobile = form.setFieldsValue({oldMobile: window.localStorage.getItem('mobile') || ''})
  }

  async userCaptcha () {
    const form = this.props.form
    const mobile = form.getFieldValue('mobile')
    const CHANGE_MOBILE = 4
    const body = {
      mobile: mobile,
      type: changeMobile
    }
    try {
      let data = await Reqest.post(API.verify, body)
      message.success(`your Captcha is ${data.code}`)
    } catch (e) {
      message.error(e)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {oldMobile, mobile, captcha} = values
        const body = {
          mobile: mobile,
          oldMobile: oldMobile,
          code: captcha
        }
        try {
          let data = await Reqest.post(API.changeMobile, body)
          message.success('修改信息成功')
          eventProxy.trigger('loginStatus', false)
          window.localStorage.clear()
          setTimeout(goto('/users/login'), 2000)
        } catch (e) {
          message.error('信息修改失败')
        }
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="旧手机号码"
        >
          {getFieldDecorator('oldMobile', {
            rules: [{required: true, message: 'Please input your mobile number!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新手机号码"
        >
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'Please input your mobile number!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{required: true, message: 'Please input the captcha you got!'}],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large" onClick={() => this.userCaptcha()}>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout} className="change-mobile-form-item">
          <Button type="primary" htmlType="submit" size="large">确认修改</Button>
        </FormItem>
      </Form>
    )
  }
}

const changeMobile = Form.create()(change)

export default changeMobile