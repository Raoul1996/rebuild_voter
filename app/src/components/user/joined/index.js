import React, { Component } from 'react'
import { Row, Col, message, Alert } from 'antd'
import { Link } from 'react-router'
import API from '../../../api/index'
import getUserToken from '../../../utils/getTokenUser'
import List from '../list/showList/index'
import MsgListComponent from '../content/msgList/index'
import Logo from '../content/lineText/index'
import './index.less'
class Joined extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: 1,
      List: [],
      page: 2,
      pages: 5,
      close: [],
      unClose: [],
      height: 20,
      flag: 0,
      isLastPage: false
    }
  }

  getJoinedList = () => {
    if (window.scrollY > this.state.height) {
      this.state.height = this.state.height + 100
      if (this.state.page <= this.state.pages) {
        let params = {
          page: this.state.page,
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
              this.setState({
                total: json.data.total,
                List: list,
                page: json.data.pageNum + 1,
                pages: json.data.pages,
                isLastPage: json.data.isLastPage
              })
            }
          }
        )
      }
      if ((this.state.page > this.state.pages) && this.state.flag === 0 ) {
        message.warning('已加载完所有投票')
        this.setState({
          page: this.state.page + 1,
          flag: 1
        })
      }
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
          if (list.length === 0) {
            message.warning('你还没有参加过投票')
          }
          this.setState({
            total: json.data.total,
            List: list,
            page: 2,
            pages: json.data.pages,
            isLastPage: json.data.isLastPage
          })
        }
      }
    )
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.getFirstJoined()
    console.log('mount scuessfully')
    window.addEventListener('scroll', this.getJoinedList)

  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.getJoinedList)
  }

  render () {
    let mobile = window.localStorage.getItem('mobile')
    let messageLoading = this.state.isLastPage?'已加载完毕所有投票':'下拉加载更多'
    return (
      <div className="show-list-wrapper">
        <Col span={23} offset={1}>
          <Link to="/users/change">
            <div className="msg-bar">
              <MsgListComponent label="手机号" text={mobile} />
            </div>
          </Link>
          <Logo text="不洗碗工作室" />
          <div className="show-list">
            <Row>
              {
                this.state.List.map((item, index) => {
                  return (
                    <List
                      key={index}
                      voteId={item.id}
                      list={item}
                    />
                  )
                })
              }
            </Row>
            <Row style={{marginBottom: '50px'}}>
              <div>
                <Col span={21} offset={1}>
                  <Alert message={messageLoading} type="info" />
                </Col>
              </div>
            </Row>
          </div>
        </Col>
      </div>
    )
  }
}
export default Joined