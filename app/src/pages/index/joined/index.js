import React, { Component } from 'react'
import { Row, Col, message, Alert } from 'antd'
import { Link } from 'react-router'
import API from '../../../api'
import getUserToken from '../../../utils/getTokenUser'

import List from '../../../components/user/list/showList'
import LineText from '../../../components/user/content/lineText'
import MsgListComponent from '../../../components/user/content/msgList'
import Logo from '../../../components/user/content/lineText/index'
import './index.less'
class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: 1,
      List: [],
      page: 2,
      pages: 1,
      close: [],
      unClose: []
    }
  }

  getJoinedList = async () => {
    if (this.state.page <= this.state.pages) {
      let params = {
        page: this.state.page,
        rows: 6
      }
      fetch(API.info.replace(/pnum/, params.page).replace(/rnum/, params.rows), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': getUserToken()
        }
      }).then((res) => {
        return res.json()
      }).then((json) => {
          if (json.code === 0) {
            let list = [
              ...this.state.List,
              ...json.data.list
            ]
            this.setState({
              total: json.data.total,
              List: list,
              page: json.data.pageNum+1,
              pages: json.data.pages
            })
          }
        }
      )
    } if(this.state.page>this.state.pages) {
      message.warning('已加载完所有投票')
    }

  }

  getFirstJoined = async () => {
    let params = {
      page: 1,
      rows: 6
    }
    fetch(API.haveVote.replace(/pnum/, params.page).replace(/rnum/, params.rows), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': getUserToken()
      }
    }).then((res) => {
      return res.json()
    }).then((json) => {
        if (json.code === 0) {
          let list = [
            ...this.state.List,
            ...json.data.list
          ]
          if(list.length === 0){
            message.warning('你还没有参加过投票')
          }

          this.setState({
            total: json.data.total,
            List: list,
            page: 2,
            pages: json.data.pages
          })

        }
      }
    )
  }

  componentDidMount () {
    this.getFirstJoined()
  }

  render () {

    return (
      <div className="show-list-wrapper">
        <Col span={23} offset={1}>
          <Link to="/users/change">
            <div className="msg-bar">
              <MsgListComponent label="手机号" text="15012321234" />
            </div>
          </Link>
          <Logo text="不洗碗工作室" />
          <div className="show-list">
            <Row>
              {
                this.state.List.map((item) => {
                    return (
                      <List
                        key={item.id}
                        voteId={item.id}
                        list={item}
                      />
                    )
                  })
                }
            </Row>
            <Row>
              <div onClick={this.getJoinedList}>
                <Col span={21} offset={1}>
                  <Alert message="点击加载更多" type="info" />
                </Col>
              </div>
            </Row>
          </div>
        </Col>
      </div>
    )
  }
}
export default Item