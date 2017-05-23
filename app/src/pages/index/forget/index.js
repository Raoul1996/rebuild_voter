import React, { Component } from 'react'
import { Link } from 'react-router'
import { Form, Input, Select, Row, Col, Button, message } from 'antd'
import './index.less'
import API from '../../../api'
import goto from '../../../utils/goto'
import Regx from '../../../utils/regx'
import Logo from '../../../components/user/content/lineText/index'
import * as Reqest from '../../../utils/request'
const FormItem = Form.Item

const ERR_OK = 0
// the const for verify method

const FORGET = 3

class ForgetForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  async userCaptcha () {
    const form = this.props.form
    const mobile = form.getFieldValue('mobile')
    const body = {
      mobile: mobile,
      type: FORGET
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
        // console.log(values)
        const {mobile, password, captcha} = values
        const body = {
          mobile: mobile,
          newPassword: password,
          code: captcha
        }
        try {
          let data = await Reqest.post(API.forget, body)
          message.success('修改信息成功')
          goto('users/login')
        } catch (e) {
          message.error('修改信息失败')
        }
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({confirmDirty: this.state.confirmDirty || !!value})
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
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
                label="手机号码"
              >
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    message: '请输入手机号码',
                    type: 'string',
                    // len: 11
                  }, {
                    pattern: Regx.mobile, message: '请输入正确的手机号码'
                  }],
                })(
                  <Input type="text" placeholder="请输入11位手机号码" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="新密码"
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
                  <Col span={12}>
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
                  <Col span={12}>
                    {/*我也不知道这里为啥需要写成箭头函数的形式，可能是promise的需要？*/}
                    <Button size="large" onClick={() => this.userCaptcha()}>获取验证码</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="ghost" htmlType="submit" size="large">重置密码</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>

    )
  }
}

const UserForget = Form.create()(ForgetForm)
export default UserForget