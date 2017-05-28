import React, { Component } from 'react'
import { Form, Radio } from 'antd'
import { Modal, Button, message } from 'antd'
import { Link } from 'react-router'
import './index.less'
import MsgListItem from '../../../components/user/content/msgList'
import Logo from '../../../components/user/content/lineText/index'
import * as Request from '../../../utils/request'
import API from '../../../api'
import goto from '../../../utils/goto'
import Regx from '../../../utils/regx'
import eventProxy from '../../../utils/eventProxy'
const FormItem = Form.Item

const RadioGroup = Radio.Group
class MsgList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      gender: 2,
      mobile: window.localStorage.getItem('mobile') || ''
    }
    this.changeSex = this.changeSex.bind(this)
  }

  changeSex (e) {
    this.setState({
      gender:e.target.value
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = async () => {
      const body = {
        newSex: this.state.gender===1?'male':'female'
      }
      try {
        await Request.uput(API.changeSex, body)
        message.success('修改性别成功')
      } catch (e) {
        message.error('修改性别失败')
      }
    setTimeout(() => {
      this.setState({
        visible: false,
      })
    }, 400)
  }
  handleCancel = () => {
    console.log('Clicked cancel button')
    this.setState({
      visible: false,
    })
  }

  render () {
    const {visible, confirmLoading} = this.state
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    return (
      <div className="msg-list-wrapper">
        <Modal title="请确认性别" visible={visible} onCancel={this.handleCancel} confirmLoading={confirmLoading}
               footer={[
                 <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
                   确认
                 </Button>,
               ]}>
          <Form>
            <FormItem
              {...formItemLayout}
            >
              <RadioGroup onChange={this.changeSex} value={this.state.gender}>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Modal>
        <Logo text="不洗碗工作室" />
        <MsgListItem label="手机号" text={this.state.mobile} />
        <div onClick={this.showModal}>
          <MsgListItem label="性别" text={this.state.gender === 1? '男':'女'} />
        </div>
        <Link to="/users/change-mobile" className="change-mobile">更改绑定手机</Link>
      </div>
    )
  }
}
export default MsgList
