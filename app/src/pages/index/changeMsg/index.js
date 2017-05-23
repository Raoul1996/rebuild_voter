import React, { Component } from 'react'
import { Form, Radio } from 'antd'
import { Modal, Button } from 'antd'
import { Link } from 'react-router'
import './index.less'
import MsgListItem from '../../../components/content/msgList'
import Logo from '../../../components/content/lineText/index'
const FormItem = Form.Item

const RadioGroup = Radio.Group
class MsgList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      gender: '男'
    }
  }
  handleChange = (e) => {
    this.state.gender = e.target.value
    console.log(this.state.gender)
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
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
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
