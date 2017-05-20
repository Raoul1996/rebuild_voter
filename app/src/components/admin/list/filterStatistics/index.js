/**
 * Created by Pororo on 17/5/19.
 */
import React, { Component } from 'react'
import { Row, Col, DatePicker, Input, Radio, Button, Card, Form } from 'antd'
import './index.less'
import StaList from '../../../../components/admin/list/statisticList'
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { RangePicker } = DatePicker;

class Filter extends Component {
  state = {
    endOpenCreate: false,
    endOpenBegin: false
  }
  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values)
    })
  }

  //单选button
  onChangeRadioOne = (e) => {
    console.log('radio checked', e.target.value)
  }
  onChangeRadioTwo = (e) => {
    console.log('radio checked', e.target.value)
  }
  //创建日期选择


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
    return (
      <div>
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
                            {getFieldDecorator('createStartTime')(
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
                            {getFieldDecorator('StartTime')(
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
                            {getFieldDecorator('state')(
                              <RadioGroup onChange={this.onChangeRadioOne}>
                                <Radio value={1}>未开始</Radio>
                                <Radio value={2}>进行中</Radio>
                                <Radio value={3}>已结束</Radio>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </Col>
                        <Col span={2} offset={2}><span>开启状态</span></Col>
                        <Col span={9}>
                          <FormItem>
                            {getFieldDecorator('off_on')(
                              <RadioGroup onChange={this.onChangeRadioTwo}>
                                <Radio value={1}>已开启</Radio>
                                <Radio value={2}>已关闭</Radio>
                              </RadioGroup>
                            )}
                          </FormItem>
                        </Col>
                      </Col>
                    </Row>
                    <Row style={{marginTop: 20, marginBottom: 50}}>
                      <Col offset={1}>
                        <Button type="primary" htmlType="submit">查询</Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Form>
            </Card>
          </Col>
          <Col span={22} offset={1} style={{marginTop:'70px',textAlign: 'center',}}>
            <StaList style={{marginTop:'40px'}}/>
          </Col>
        </Row>
      </div>
    )
  }
}

const WrappedFilter = Form.create()(Filter)
export default WrappedFilter
