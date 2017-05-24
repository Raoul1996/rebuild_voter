import React, { Component } from 'react'
import { Form, Radio } from 'antd'
import { Modal, Button, message } from 'antd'
import { Link } from 'react-router'
import './index.less'
import MsgListItem from '../../../components/user/content/msgList'
import Logo from '../../../components/user/content/lineText/index'
import * as Reqest from '../../../utils/request'
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
      gender: 'male',
      flag: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

// TODO: 这里有问题
  async  handleChange (e) {
    this.state.gender = e.target.value
    console.log(this.state.gender)
    if (this.state.flag < 10) {
      const body = {
        newSex: this.state.gender
      }
      try {
        let data = await
          Reqest.uput(API.changeSex, body)
      } catch (e) {
        message.error('信息手机号失败')
      }
    }
  }

changeSex () {

  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
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
              label=""
            >
              <RadioGroup onChange={this.handleChange}>
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Modal>
        <Logo text="不洗碗工作室" />
        <MsgListItem label="手机号" text="15015015015" />
        <div onClick={this.showModal}>
          <MsgListItem label="性别" text={this.state.gender} />
        </div>
        <Link to="/users/change-mobile" className="change-mobile">更改绑定手机</Link>
      </div>
    )
  }
}
export default MsgList
