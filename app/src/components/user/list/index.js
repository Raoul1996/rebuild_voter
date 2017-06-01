import React, { Component } from 'react'
import { Row, Col, message, Alert } from 'antd'
import { Link } from 'react-router'
import API from '../../../api/index'
import getUserToken from '../../../utils/getTokenUser'
import List from './showList/index'
import LineText from '../content/lineText/index'
import MsgListComponent from '../content/msgList/index'
import Logo from '../content/lineText/index'
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
      unClose: [],
      height:225
    }
  }

  getVoteList = async () => {
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
              page: json.data.pageNum + 1,
              pages: json.data.pages
            })
          }
        }
      )
    }
    if (this.state.page > this.state.pages) {
      message.warning('已加载完所有投票')
    }
  }

  getFirstList = async () => {
    let params = {
      page: 1,
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
            page: 2,
            pages: json.data.pages
          })
        }
      }
    )
  }

  componentDidMount () {
    this.getFirstList()
    window.addEventListener('scroll',
      () => {
        if (window.scrollY > this.state.height ) {
          this.state.height=this.state.height + 356
          this.getVoteList()
        }
      })

  }
  componentWillUnmount (){
    window.addEventListener('scroll',
      () => {
        if (window.scrollY > this.state.height ) {
          this.state.height=this.state.height + 356
          this.getVoteList()
        }
      })
  }


  render () {
    let is_login = window.localStorage.getItem('is_login') || '0'
    let mobile = window.localStorage.getItem('mobile')
    return (
      <div className="show-list-wrapper">
        <Col span={23} offset={1}>
          <Link to="/users/change">
            {
              is_login === '1' &&
              <div className="msg-bar">
                <MsgListComponent label="手机号" text={mobile} />
              </div>
            }
          </Link>
          <Logo text="不洗碗工作室" />
          <div className="show-list">
            <Row>
              {
                this.state.List.map((item) => {
                  if (item.flag === 0 || item.flag === 1) {
                    return (
                      <List
                        key={item.id}
                        voteId={item.id}
                        list={item}
                      />
                    )
                  }
                })
              }
            </Row>
            <Row>
              <div>
                <Col span={21} offset={1}>
                  <Alert message="下拉加载更多" type="info" />
                </Col>
              </div>
            </Row>
            <LineText text="历史投票" />
            <div className="history-wrapper">
              <Row>
                {
                  this.state.List.map((item) => {
                    if (item.flag === 2) {
                      return (
                        <List
                          key={item.id}
                          voteId={item.id}
                          list={item}
                        />
                      )
                    }
                  })
                }
              </Row>
            </div>
          </div>
        </Col>
      </div>
    )
  }
}
export default Item