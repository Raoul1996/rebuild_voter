import React, { Component } from 'react'
import { Link } from 'react-router'
import { Col, Row, Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item
// import the less file for this pages
import './index.less'
// import the api
import API from '../../../api'
import Regx from '../../../utils/regx'
import { testArgs } from '../../../utils/testArgs'
class NormalLoginForm extends Component {
  constructor (props){
    super(props)
    this.userLogin = this.userLogin.bind(this)
  }
  userLogin (userName, password) {
    if (!testArgs(userName, Regx.mobile) || !testArgs(password, Regx.password)) return
    const ERR_OK = 0
    console.log('will come to the userLogin func')
    if (window.localStorage.getItem('token') === '') {
      console.error('no token in the localStorage')
    } else {
      console.log(window.localStorage.getItem('token'))
    }
    fetch(API.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': window.localStorage.getItem('token')
      },
      body: JSON.stringify({
        mobile: userName,
        password: password
      })
    }).then((res) => res.json())
      .then((json) => {
        console.log('fetch data successful')
        console.log(json)
        if (json.code === ERR_OK) {
          console.log('login successful')
          window.localStorage.setItem('token', json.data.token)
          window.localStorage.setItem('mobile', json.data.user.mobile)
        }
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.userLogin(values.userName, values.password)
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
                {getFieldDecorator('userName', {
                  rules: [{
                    required: true,
                    message: 'Please input your username!'
                  },{
                    pattern: Regx.mobile, message: '请输入正确的手机号码'
                  }],
                })(
                  <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: 'Please input your Password!'
                  },{
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

