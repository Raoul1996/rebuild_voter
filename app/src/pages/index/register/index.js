import React, { Component } from 'react'
import { Link } from 'react-router'
import { Form, Input, Select, Row, Col, Button, message } from 'antd'
import './index.less'
import API from '../../../api'
import goto from '../../../utils/goto'
import Regx from '../../../utils/regx'
import Logo from '../../../components/content/lineText/index'
import * as Reqest from '../../../utils/request'
const FormItem = Form.Item
const Option = Select.Option

const ERR_OK = 0
// the const for verify method
const REGISTER = 1
const PASSWD = 2
const PERSONAL = 3

class RegistrationForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }
    // this.userRegister = this.userRegister.bind(this)
  }

  async userCaptcha () {
    const form = this.props.form
    const mobile = form.getFieldValue('mobile')
    const body = {
      mobile: mobile,
      type: REGISTER
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
          password: password,
          code: captcha
        }
        try {
          let data = await Reqest.post(API.register, body)
          message.success('register successful')
          goto('users/login')
        } catch (e) {
          message.error('register err')
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
    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '86',
    // })(
    //   <Select className="icp-selector">
    //     <Option value="86">+86</Option>
    //   </Select>
    // )
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
                    <Button size="large" onClick={() =>this.userCaptcha()}>获取验证码</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large">Register</Button>
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