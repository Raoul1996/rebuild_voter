import React, { Component } from 'react'
import { Link } from 'react-router'
import { Form, Input, Select, Row, Col, Button, message } from 'antd'
import './index.less'
import API from '../../../api'
import goto from '../../../utils/goto'
import Regx from '../../../utils/regx'
import Logo from '../../../components/user/content/lineText/index'
import * as Request from '../../../utils/request'
const FormItem = Form.Item

const FORGET = 3

class ChangePasswordItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      messageButton: '免费获取验证码',
      buttonDisable: {}
    }
    this.userCaptcha = this.userCaptcha.bind(this)
  }

  async userCaptcha () {
    const mobile = window.localStorage.getItem('mobile')
    const body = {
      mobile: mobile,
      type: FORGET
    }
    try {
      let data = await Request.post(API.verify, body)
      console.log(data.code)
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
        buttonDisable: {'disabled':false}
      })
      countdown = 60
      return
    } else {
      this.setState({
        messageButton: countdown + '秒重新发送',
        buttonDisable: {'disabled':true}
      })
      countdown--
      setTimeout(()=> {this.setTime(countdown) }, 1000)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {oldPassword, newPassword, captcha} = values
        const body = {
          oldPassword: oldPassword,
          newPassword: newPassword,
          code: captcha
        }
        try {
          let data = await Request.uput(API.forget, body)
          console.log(data)
          message.success('密码修改成功')
          setTimeout(() => {
            goto('users/login')
          }, 2000)
        } catch (e) {
          message.error('修改信息失败')
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
      <div className="forget-page-wrapper">
        <Logo text="不洗碗工作室" />
        <Row className="forget">
          <Col span={22} offset={1}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="旧密码"
              >
                {getFieldDecorator('oldPassword', {
                  rules: [{
                    required: true,
                    message: '请输入旧密码',
                  }, {
                    pattern: Regx.password, message: '请输入6到20位字符'
                  }],
                })(
                  <Input type="password" placeholder="请输入11位手机号码" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="新密码"
                hasFeedback
              >
                {getFieldDecorator('newPassword', {
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
                  <Col span={4}>
                    <Button size="large" {...this.state.buttonDisable}
                            onClick={this.userCaptcha}>{this.state.messageButton}</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large" className="forget-password">重置密码</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

const ChangePassword = Form.create()(ChangePasswordItem)
export default ChangePassword