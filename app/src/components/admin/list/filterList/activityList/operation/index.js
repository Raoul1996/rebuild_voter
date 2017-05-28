/**
 * Created by Pororo on 17/5/17.
 */
import React, { Component } from 'react'
import { Icon, Modal, message } from 'antd'
import { Link } from 'react-router'
import urlEncoder from '../../../../../../utils/urlEncoder'
import API from '../../../../../../api/index'
import * as Request from '../../../../../../utils/request'

class Operation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_stop: true
    }
  }

  isStop = async () => {
    try {
      await Request.put(API.changeVisibility.replace(/:voteId/, this.props.voteId), {}, {})
      message.success('修改成功')
      window.history.go(0)
    } catch (e) {
      message.error(e)
    }
  }

  isDelete = () => {
    const id = this.props.voteId
    Modal.confirm({
      title: '删除投票后，本投票活动及相关数据都会消失，是否确认删除？',
      okText: 'OK',
      cancelText: 'Cancel',
      async onOk () {
        try {
          await Request.Delete(API.delete.replace(/:voteId/, id), {})
          await window.history.go(0)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }

  render () {
    const query = {
      'voteId': this.props.voteId
    }

    return (
      <span>
        <a href="javascript:void(0)" onClick={this.isStop}>
          {
            this.props.visibility === 'true' ? <Icon type="pause" /> : <Icon type="caret-right" />
          }
        </a>
        <span className="ant-divider" />
        <Link to={urlEncoder('edit', query)}>
          <Icon type="edit" />
        </Link>
        <span className="ant-divider" />
          <a href="javascript:void(0)" className="ant-dropdown-link" onClick={this.isDelete}>
            <Icon type="delete" />
          </a>
      </span>
    )
  }
}

export default Operation