import React, { Component } from 'react'
import { Link } from 'react-router'
import './index.less'
import MsgListItem from '../../../components/user/content/msgList'
import Logo from '../../../components/user/content/lineText/index'
class MsgList extends Component{
  render() {
    return(
      <div className="msg-list-wrapper">
        <Logo text="不洗碗工作室" />
        <MsgListItem label="手机号" text="15015015015"/>
        <MsgListItem label="性别" text="男"/>
        <Link to="/users/change-mobile" className="change-mobile">更改绑定手机</Link>
      </div>
    )
  }
}
export default MsgList