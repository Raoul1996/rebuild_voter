import React, { Component } from 'react'
import { Row, Col, DatePicker, Input, Radio, Button, Card, Form } from 'antd'
import { Link } from 'react-router'
import './index.less'
import ActList from '../../../../components/admin/list/activityList'
import * as Request from '../../../../utils/request'
import timeTransform from '../../../../utils/timeTransfrom'
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
      title: null,
      creator: null,
      participatorNum: null,
      flag: null,
      total: '',
      pages: '',
      list: [{
        id: 68,
        title: 'Test4121',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test412',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test412131',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test4121',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test412',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'Test412131',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }, {
        id: 68,
        title: 'T',
        startTime: 1494701083985,
        endTime: 1494701083999,
        type: 2,
        max: 3,
        mobile: '13257300865',
        participatorNum: 0,
        flag: 2
      }]
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      const {start, create, title, creator, flag, participatorNum} = values
      const body = {
        createFrom: create ? Date.parse(create[0]) : null,
        createTo: create ? Date.parse(create[1]) : null,
        startFrom: start ? Date.parse(start[0]) : null,
        startTo: start ? Date.parse(start[1]) : null,
        title: title ? title : null,
        creator: creator ? creator : null,
        participatorNum: participatorNum ? participatorNum : null,
        flag: flag ? flag : null
      }
      console.log(body)
    })
  }

  getFirstPage = async () => {
    // let params = {
    //   page: 1,
    //   row: 6
    // }
    // const json = await Request.tget(API.pageInfo,params)
    fetch(API.pageInfo.replace(/pnum/, 1).replace(/rnum/, 6), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': '67d6cdb8519a49edbfb8c2cdd9841119'
      }
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
    this.getFirstPage()
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
      pageSize: 4,
      total: this.state.total,
      pages: this.state.pages,
      onChange: async (page) => {
        let params = {
          page: page,
          row: 4
        }
        window.sessionStorage.setItem('current', page)
        fetch(API.pageInfo.replace(/pnum/, params.page).replace(/rnum/, params.rows), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': '67d6cdb8519a49edbfb8c2cdd9841119'
          }
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
    return (
      <div className="filter-list">
        <Row>
          <Col span={22} offset={1} style={MarginStyle}>
            <Card>
              <Form onSubmit={this.handleSearch}>
                <Col span={22}>
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
                            {getFieldDecorator('creator')(
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
                            {getFieldDecorator('participatorNum')(
                              <RadioGroup>
                                <Radio value={1}>已开启</Radio>
                                <Radio value={2}>已关闭</Radio>
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
          <Col span={22} offset={1} style={ListStyle}>
            <Link to="create">
              <Button style={ButtonStyle}>+创建活动</Button>
            </Link>
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