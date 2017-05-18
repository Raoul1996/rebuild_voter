/**
 * Created by Pororo on 17/5/17.
 */
import React, { Component } from 'react'
import { Icon, Modal} from 'antd'
import { Link } from 'react-router'
import urlEncoder from '../../../../../utils/urlEncoder'
import API from '../../../../../api'
import * as Request from '../../../../../utils/request'

class Operation extends Component {
  constructor (props) {
    super(props)
  }

  state = {
    voteId: 21
  }

  isStop = async () => {
    let body = {
      voteId:this.state.voteId
    }
    await Request.put(API.changeVisibility, headers, body)
    console.log('stop')
  }

  isDelete = () => {
    Modal.confirm({
      title: '删除投票后，本投票活动及相关数据都会消失，是否确认删除？',
      okText: 'OK',
      cancelText: 'Cancel',
      async onOk () {
        try {
          await Request.Delete(API.delete.replace(/:voteId/, this.state.voteId), 'DELETE')
        } catch (e) {
          console.log(e)
        }
      }
    })

    console.log('delete')
  }

  render () {
    const query = {
      'voteId': this.state.voteId
    }
    return (
      <span>
        <a href="javascript:void(0)" onClick={this.isStop}>
          <Icon type="pause" />
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