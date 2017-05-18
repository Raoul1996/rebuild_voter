import React, { Component } from 'react'
import { Link } from 'react-router'
import { Form, Input, Select, Row, Col, Button} from 'antd'
import './index.less'
import API from '../../../api'
import Regx from '../../../utils/regx'
import {testArgs} from '../../../utils/testArgs'

const FormItem = Form.Item
const Option = Select.Option

const ERR_OK = 0
// the const for verify method
const REGISTER  = 1
const PASSWD = 2
const PERSONAL = 3

class RegistrationForm extends React.Component {
  constructor (props){
    super(props)
    this.state= {
      confirmDirty: false,
      autoCompleteResult: [],
    }
    this.userRegister = this.userRegister.bind(this)
3  }
  userRegister (userName, password,code) {
    if (!testArgs(userName, Regx.mobile) || !testArgs(password, Regx.password))return
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
        console.log(json)
        if (json.code === ERR_OK) {
          console.log('register successful')
          // window.localStorage.setItem('token',json.data.token)
        }
      })
  }
  userCaptcha (type) {
    const form = this.props.form
    const mobile = form.getFieldValue('phone')
    if (!testArgs(mobile, Regx.mobile)) return
    fetch(API.verify,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        mobile: mobile,
        type: type
      })
    }).then((res) => res.json())
      .then((json) => {
        console.log('fetch data successful')
        console.log(json)
        if (json.code === ERR_OK) {
          console.log('getCaptcha successful')
          console.log(json.data.code)
        }
      })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log(values)
        {}
        this.userRegister(values.phone, values.password,values.captcha)
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
                    message: '请输入手机号码',
                    type: 'string',
                    // len: 11
                  },{
                    pattern: Regx.mobile, message: '请输入正确的手机号码'
                  }],
                })(
                  <Input type="text" placeholder="请输入11位手机号码"/>
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
                        len:4
                      }],
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                  <Col span={12}>
                    <Button size="large"  onClick={()=>this.userCaptcha (REGISTER)}>获取验证码</Button>
                  </Col>
                </Row>
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" size="large" >Register</Button>
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