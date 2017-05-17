import React, { Component } from 'react'
import { Link } from 'react-router'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
import './index.less'
import API from '../../../api'
import Regx from '../../../utils/regx'
import {testArgs} from '../../../utils/testArgs'

const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }
  userRgeister (userName, password,code) {
    if (testArgs(userName, Regx.mobile) || testArgs(password, Regx.password))return
    const ERR_OK = 0
    console.log('will come to the userLogin func')
    if (window.localStorage.getItem('token') === '') {
      console.error('no token in the localStorage')
    } else {
      console.log(window.localStorage.getItem('token'))
    }
    fetch(API.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        mobile: userName,
        password: password,
        code:code
      })
    }).then((res) => res.json())
      .then((json) => {
        console.log('fetch data successful')
        // console.log(json)
        if (json.code === ERR_OK) {
          console.log('register successful')
          // window.localStorage.setItem('token',json.data.token)
        }
      })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.userRgeister(values.userName, values.password,values.code)
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
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true})
    }
    callback()
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const {autoCompleteResult} = this.state

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    )
    return (
      <div className="register-page-wrapper">
        <Row className="register">
          <Col span={22} offset={1}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="手机号码"
              >
                {getFieldDecorator('phone', {
                  rules: [{
                    required: true,
                    message: '请输入正确的手机号码',
                    type: 'string',
                    len: 11
                  }],
                })(
                  <Input addonBefore={prefixSelector} placeholder="请输入11位手机号码"/>
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
                    min:6,
                    max:20,
                    message: '请输入不少于6位字符'
                  }, {
                    validator: this.checkConfirm,
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
                      rules: [{required: true, message: '请输入四位验证码',len:4}],
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button size="large">获取验证码</Button>
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