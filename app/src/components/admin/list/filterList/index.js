import React, { Component } from 'react'
import { Row, Col, DatePicker, Input, Radio, Button, Card, Form, message, } from 'antd'
import { Link } from 'react-router'
import './index.less'
import ActList from './activityList'
import * as Request from '../../../../utils/request'
import timeTransform from '../../../../utils/timeTransfrom'
import getToken from '../../../../utils/getTokenAdmin'
import API from '../../../../api'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const {RangePicker} = DatePicker

class FilterList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      endOpenCreate: false,
      endOpenBegin: false,
      total: '',
      pages: '',
      list: [],
      filter: 0,
      body: window.sessionStorage.getItem('activityFilter') ?
        JSON.parse(window.sessionStorage.getItem('activityFilter')) : {},
      currentPage: +window.sessionStorage.getItem('activeCurrentPage'),
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      const {start, create, title, mobile, flag, visibility} = values
      const body = {
        createTimeFrom: create ? Date.parse(create[0]) : -1,
        createTimeTo: create ? Date.parse(create[1]) : -1,
        startTimeFrom: start ? Date.parse(start[0]) : -1,
        startTimeTo: start ? Date.parse(start[1]) : -1,
        title: title ? title : null,
        mobile: mobile ? mobile : null,
        visibility: (visibility === 1 || visibility === 0) ? visibility : -1,
        flag: (flag === 0 || flag === 1 || flag === 2) ? flag : -1
      }
      this.setState({
        body:body,
        currentPage: 1
      })
      window.sessionStorage.setItem('activityFilter', JSON.stringify(body))
      console.log(window.sessionStorage)

      fetch(API.findLike, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': getToken()
        },
        body: JSON.stringify(body)
      }).then((res) => {
        return res.json()
      }).then((json) => {
        if (json.code === 0) {
          message.success('查询成功')
          this.setState({
            total: json.data.total,
            list: json.data.list,
            pages: json.data.pages,
            filter: 1
          })
          console.log(this.state.list)
        }
      })
    })

  }

  getPage = async () => {
    // let params = {
    //   page: 1,
    //   row: 6
    // }
    // const json = await Request.tget(API.pageInfo,params)
    let page = this.state.currentPage
    let body = window.sessionStorage.getItem('activityFilter') ?
      JSON.parse(window.sessionStorage.getItem('activityFilter')) : {}
    fetch(API.findLikePage.replace(/pnum/, page).replace(/rnum/, 6), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': getToken()
      },
      body: JSON.stringify(body)
    }).then((res) => {
      return res.json()
    }).then((json) => {
        if (json.code === 0) {
          message.success('投票首页获取成功')
          this.setState({
            total: json.data.total,
            list: json.data.list,
            pages: json.data.pages
          })
        }
      }
    )
  }

  componentDidMount () {
    this.getPage()
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const ListStyle = {
      // background: 'rgb(240,20,20)',
      textAlign: 'center',
      marginTop: '20px'
    }
    const MarginStyle = {
      marginTop: '20px'
    }
    const ButtonStyle = {
      float: 'right'
    }
    const pagination = {
      pageSize: 6,
      total: this.state.total,
      pages: this.state.pages,
      current: this.state.currentPage,
      onChange: async (page) => {
        let params = {
          page: page,
          rows: 6
        }
        window.sessionStorage.setItem('activeCurrentPage', page)
        this.setState({
          currentPage: page
        })
        console.log(this.state.currentPage)
        if (this.state.filter === 0) {
          let body = window.sessionStorage.getItem('activityFilter') ?
            JSON.parse(window.sessionStorage.getItem('activityFilter')) : {}
          fetch(API.findLikePage.replace(/pnum/, params.page).replace(/rnum/, params.rows), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': getToken()
            },
            body: JSON.stringify(body)
          }).then((res) => {
            return res.json()
          }).then((json) => {
              if (json.code === 0) {
                message.success('投票分页获取成功')
                this.setState({
                  total: json.data.total,
                  list: json.data.list,
                  pages: json.data.pages
                })
              }
            }
          )
        } else if (this.state.filter === 1) {
          fetch(API.findLikePage.replace(/pnum/, params.page).replace(/rnum/, params.rows), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token': getToken()
            },
            body: JSON.stringify(this.state.body)
          }).then((res) => {
            return res.json()
          }).then((json) => {
              if (json.code === 0) {
                message.success('投票分页获取成功')
                this.setState({
                  total: json.data.total,
                  list: json.data.list,
                  pages: json.data.pages
                })
              }
            }
          )
        }
      }
    }
    return (
      <div className="filter-list">
        <Row>
          <Col span={22} offset={1} style={MarginStyle}>
            <Card>
              <Form onSubmit={this.handleSearch}>
                <Col span={22} >
                  <div className='filter'>
                    <Row style={{marginTop: 20}}>
                      <Col span={20} offset={1}>
                        <sapn className='filter-font'>筛选</sapn>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={22} offset={1}>
                        <Col span={2}><span>创建时间</span></Col>
                        <Col span={9}>
                          <FormItem>
                            {getFieldDecorator('create')(
                              <RangePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={['开始时间', '结束时间']}
                              />
                            )}
                          </FormItem>
                        </Col>
                        <Col span={2}><span>开始时间</span></Col>
                        <Col span={9}>
                          <FormItem>
                            {getFieldDecorator('start')(
                              <RangePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={['开始时间', '结束时间']}
                              />
                            )}
                          </FormItem>
                        </Col>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={22} offset={1}>
                        <Col span={2}><span>活动名称</span></Col>
                        <Col span={6}>
                          <FormItem>
                            {getFieldDecorator('title')(
                              <Input />
                            )}
                          </FormItem>
                        </Col>
                        <Col span={2} offset={3}><span>创建人</span></Col>
                        <Col span={6}>
                          <FormItem>
                            {getFieldDecorator('mobile')(
                              <Input />
                            )}
                          </FormItem>
                        </Col>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                      <Col span={22} offset={1}>
                        <Col span={2}><span>活动状态</span></Col>
                        <Col span={7}>
                          <FormItem>
                            {getFieldDecorator('flag')(
                              <RadioGroup>
                                <Radio value={0}>未开始</Radio>
                                <Radio value={1}>进行中</Radio>
                                <Radio value={2}>已结束</Radio>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={2} offset={2}><span>开启状态</span></Col>
                        <Col span={9}>
                          <FormItem>
                            {getFieldDecorator('visibility')(
                              <RadioGroup>
                                <Radio value={1}>已开启</Radio>
                                <Radio value={0}>已关闭</Radio>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </Col>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20, marginBottom: 50}}>
                      <FormItem>
                        <Col offset={1}>
                          <Button type="primary" htmlType="submit">查询</Button>
                        </Col>
                      </FormItem>
                    </Row>
                  </div>
                </Col>
              </Form>
            </Card>
          </Col>
          <Col span={4} offset={20} style={ListStyle}>
              <div>
                <Link to="create">
                <Button type="primary">+创建投票</Button>
                </Link>
              </div>
          </Col>
          <Col span={22} offset={1} style={ListStyle}>
            <ActList total={this.state.total} list={this.state.list} pagination={pagination} />
          </Col>
        </Row>
      </div>
    )
  }
}

const WrappedFilter = Form.create()(FilterList)
export default WrappedFilter