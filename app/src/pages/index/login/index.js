import React, { Component } from 'react'
import { Link } from 'react-router'
import { Col, Row, Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item
// import the less file for this pages
import './index.less'
// import the api
import API from '../../../api'
class NormalLoginForm extends Component {
  userLogin (userName, password) {
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
        // console.log(json)
        if (json.code === ERR_OK) {
          console.log('login successful')
          window.localStorage.setItem('token',json.data.token)
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
                  rules: [{required: true, message: 'Please input your username!'}],
                })(
                  <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: 'Please input your Password!'}],
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

