/**
 * Created by Pororo on 17/5/15.
 */
import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import './index.less'
import Goto from '../../../utils/goto'
import API from '../../../api'
import * as Request from '../../../utils/request'
const FormItem = Form.Item

class AdminLogin extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const {mobile, password} = values
        const body = {
          mobile: mobile,
          password: password
        }

        try {
          let data = await Request.post(API.adminLogin, body)
          window.localStorage.setItem('admin.token', data.token)
          window.sessionStorage.setItem('path','/admin/filter-list')
          setTimeout(Goto('admin/filter-list'),1000)
        } catch (e) {
          message.error('登录失败')
        }
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <div className="admin-login">
        <div className='login-title'>
          <span>投票管理</span>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{required: true, message: '请输入用户名'}],
            })(
              <Input prefix={<Icon type="user" style={{fontSize: 13}} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}],
            })(
              <Input prefix={<Icon type="lock" style={{fontSize: 13}} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-button" size="large" >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedAdminLogin = Form.create()(AdminLogin)
export default WrappedAdminLogin