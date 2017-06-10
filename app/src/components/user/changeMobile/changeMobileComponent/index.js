import React from 'react'
import './index.less'
import { Form, Input, Row, Col, Button, message } from 'antd'
const FormItem = Form.Item
import * as Request from '../../../../utils/request'
import API from '../../../../api'
import goto from '../../../../utils/goto'
import Regx from '../../../../utils/regx'
import eventProxy from '../../../../utils/eventProxy'
class change extends React.Component {
  constructor (props){
    super(props)
    this.state={
      confirmDirty: false,
      autoCompleteResult: [],
      messageButton: '免费获取验证码',
      buttonDisable: {}
    }
    this.userCaptcha = this.userCaptcha.bind(this)
  }

  componentDidMount () {
    this.setValue()
  }

  setValue () {
    const form = this.props.form
    const oldMobile = form.setFieldsValue({oldMobile: window.localStorage.getItem('mobile') || ''})
  }

  async userCaptcha () {
    const form = this.props.form
    const mobile = form.getFieldValue('mobile')
    const CHANGE_MOBILE = 4
    const body = {
      mobile: mobile,
      type: CHANGE_MOBILE
    }
    try {
      let data = await Request.post(API.verify, body)
      if(data.code !== 0){
        message.success(`验证码发送成功`)
        this.setTime(60)
      }
    } catch (e) {
      message.error(e)
    }
  }

  setTime = (countdown) => {
    if (countdown === 0) {
      this.setState({
        messageButton: '免费获取验证码',
        buttonDisable: {'disabled': false}
      })
      countdown = 60
      return
    } else {
      this.setState({
        messageButton: countdown + '秒重新发送',
        buttonDisable: {'disabled': true}
      })
      countdown--
      setTimeout(() => {this.setTime(countdown) }, 1000)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {oldMobile, mobile, password, captcha} = values
        const body = {
          oldMobile: oldMobile,
          newMobile: mobile,
          password: password,
          code: captcha
        }
        try {
          let data = await Request.uput(API.changeMobile, body)
          console.log(data)
          message.success('修改手机号成功')
          window.localStorage.clear()
          // setTimeout(() => {
          //   goto('/users/login')
          // }, 2000)
        } catch (e) {
          message.error('信息手机号失败')
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
            rules: [{required: true, message: '请输入旧手机号'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新手机号码"
        >
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: '请输入新手机号'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入密码'
            }, {
              pattern: Regx.password, message: '请输入6到20位字符'
            }],
          })(
            <Input type="password" placeholder="请输入不少于6位字符" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={14}>
              {getFieldDecorator('captcha', {
                rules: [{required: true, message: '请输入您收到的验证码'}],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={4}>
              <Button size="large" onClick={this.userCaptcha} {...this.state.buttonDisable}>{this.state.messageButton}</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout} className="change-mobile-form-item">
          <Button type="primary" htmlType="submit" size="large" className="change-mobile-button">确认修改</Button>
        </FormItem>
      </Form>
    )
  }
}

const changeMobile = Form.create()(change)

export default changeMobile