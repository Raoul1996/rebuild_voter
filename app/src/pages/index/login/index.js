import React, { Component } from 'react'
import { Link } from 'react-router'
import { Col, Row, Form, Icon, Input, Button, Checkbox, message } from 'antd'
const FormItem = Form.Item
import * as Request from '../../../utils/request'
// import the less file for this pages
import './index.less'
// import the api
import API from '../../../api'
import Regx from '../../../utils/regx'
import goto from '../../../utils/goto'
import eventProxy from '../../../utils/eventProxy'
const ERR_OK = 0
class NormalLoginForm extends Component {
  constructor (props) {
    super(props)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // this.userLogin(values.mobile, values.password)
        const {mobile, password} = values
        const body = {
          mobile: mobile,
          password: password
        }

        try {
          let data = await Request.post(API.login, body)
          console.log(data)
          window.localStorage.setItem('token', data.token)
          window.localStorage.setItem('mobile', data.user.mobile)
          message.success('login successful')
          goto('users/list')
        } catch (e) {
          message.error('login err')
        }

      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <div className="login-page-wrapper">
        <Row className="login-wrapper">
          <Col span={22}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    // max: 11,
                    // min: 11,
                    message: '请输入正确的手机号码!'
                  },
                    {
                      pattern: Regx.mobile, message: '请输入正确的手机号码'
                    }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="mobile" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: 'Please input your Password!'
                  }, {
                    pattern: Regx.password, message: '请输入6到20位字符'
                  }],
                })(
                  <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  已有账号，立即登录
                </Button>
                {/*Or <a href="">register now!</a>*/}
                <Link to="users/register" className="login-form-register">
                  <Button type="default" className="login-form-button">
                    还没账号，立即注册
                  </Button>
                </Link>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
const UserPages = Form.create()(NormalLoginForm)
export default UserPages

