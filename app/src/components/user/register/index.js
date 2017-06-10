import React, { Component } from 'react'
import { Form, Input, Row, Col, Button, message } from 'antd'
import './index.less'
import API from '../../../api'
import goto from '../../../utils/goto'
import Regx from '../../../utils/regx'
import Logo from '../../../components/user/content/lineText/index'
import * as Request from '../../../utils/request'
const FormItem = Form.Item

const REGISTER = 1

class RegistrationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      messageButton: '免费获取验证码',
      buttonDisable: {}
    }
    this.userCaptchaRegister = this.userCaptchaRegister.bind(this)
  }

  async userCaptchaRegister () {
    const form = this.props.form
    const mobile = form.getFieldValue('mobile')
    const body = {
      mobile: mobile,
      type: REGISTER
    }
    try {
      let data = await Request.post(API.verify, body)
      if (data.code !== 0) {
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
        const {mobile, password, captcha} = values
        const body = {
          mobile: mobile,
          password: password,
          code: captcha
        }
        try {
          await Request.post(API.register, body)
          message.success('register successful')
          goto('users/login')
        } catch (e) {
          message.error('register err')
        }
      }
    })
  }

  componentDidMount () {
    window.scrollTo(0, 0)
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
      <div className="register-page-wrapper">
        <Logo text="不洗碗工作室" />
        <Row className="register">
          <Col span={22} offset={1}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="手机号码"
              >
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: '请输入手机号码',
                    type: 'string',
                  }, {
                    pattern: Regx.mobile, message: '请输入正确的手机号码'
                  }],
                })(
                  <Input type="text" placeholder="请输入11位手机号码" />
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
                      rules: [{
                        required: true,
                        message: '请输入四位验证码',
                        len: 4
                      }],
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                  <Col span={5}>
                    <Button size="large"
                            onClick={this.userCaptchaRegister}  {...this.state.buttonDisable}>{this.state.messageButton}</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large" className="register-button">注册</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>

    )
  }
}

const UserRegister = Form.create()(RegistrationForm)
export default UserRegister