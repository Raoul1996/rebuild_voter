import React, { Component } from 'react'
import { Link } from 'react-router'
import { Col, Row, Form, Icon, Input, Button, Checkbox, message } from 'antd'
const FormItem = Form.Item
import * as Request from '../../../utils/request'
// import the less file for this pages
import './index.less'
// import the api
import Logo from '../../../components/user/content/lineText/index'
import API from '../../../api'
import Regx from '../../../utils/regx'
import goto from '../../../utils/goto'
import eventProxy from '../../../utils/eventProxy'
const ERR_OK = 0
class NormalLoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loginStatus: 0
    }
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
          window.localStorage.setItem('user.token', data.token)
          window.localStorage.setItem('mobile', data.user.mobile)
          message.success('login successful')
          this.state.loginState = true
          // flag :用来通知兄弟组件进行更新
          eventProxy.trigger('flag', new Date().getTime())
          // loginStatus: 用来传递登录状态
          eventProxy.trigger('loginStatus', 1)
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
        <Logo text="不洗碗工作室" />
        <Row className="login-wrapper">
          <Col span={22}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true,
                    max: 11,
                    min: 11,
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
                <Link className="login-form-forgot" to="/users/forget">Forgot password</Link>
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

