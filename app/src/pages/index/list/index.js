import React, { Component } from 'react'
import { Row, Col, Icon, Pagination, message} from 'antd'
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
    this.state={
      total: 1,
      List: [],
    }
  }

  getVoteList = async (page) => {
    let params = {
      page: page,
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
          message.success('投票2获取成功')
          this.setState({
            total: json.data.total,
            List: json.data.list
          })
        }
      }
    )
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
          message.success('投票1获取成功')
          this.setState({
            total: json.data.total,
            List: json.data.list
          })
        }
      }
    )
  }

  componentDidMount () {
    this.getFirstList()
  }

  render()
{
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
              this.state.List.map((item)=>{
                if(item.flag===0||item.flag===1){
                  return(
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
          <Col span={10} offset={7} onChange={this.getVoteList}>
            <Pagination simple defaultPageSize={6} total={this.state.total} onChange={this.getVoteList}/>
          </Col>
          <LineText text="历史投票" />
          <Row>
            {
              this.state.List.map((item)=>{
                if(item.flag === 2){
                  return(
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
      </Col>
    </div>
  )
}
}
export default Item