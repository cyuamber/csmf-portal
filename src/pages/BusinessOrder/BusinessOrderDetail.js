import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from './actions'
import { Card, Form, Col, Input, Select, Radio, Button, Row, } from "antd";
import { ORDER_CREATE_FORM } from '../../constant/constants'
import { axiospost } from '../../utils/http'
import APIS from '../../constant/apis'

import './BusinessOrderDetail.less';

class BusinessOrderDetail extends Component {
    state = {}

    getRules = (message, initialValue) => ({ rules: [{ required: true, message }], initialValue })

    getFormItem = () => {
        const { form: { getFieldDecorator } } = this.props;
        const provinceList = this.props.businessorder.get('provinceList').toJS()
        const cityList = this.props.businessorder.get('cityList').toJS()
        const countyList = this.props.businessorder.get('countyList').toJS()
        const { Item } = Form
        const { Option } = Select

        return ORDER_CREATE_FORM.map(item => {
            if (item.options) {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={item.title}>
                            {getFieldDecorator(item.key, this.getRules(`${item.title} is required`, item.options[0]))(
                                <Select>
                                    {item.options.map(item => <Select.Option key={item}>{item}</Select.Option>)}
                                </Select>
                            )}
                        </Item>
                    </Col>
                )
            } else if (item.key === 'businessName') {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={item.title}>
                            {getFieldDecorator(item.key, this.getRules(`${item.title} is required`))(<Input />)}
                        </Item>
                    </Col>
                )
            } else if (item.key === 'area') {
                return (
                    <Col key={item.key} span={12}>
                        <Col span={12}>
                            <Item label={item.title} labelCol={{ span: 10, offset: 2 }} wrapperCol={{ span: 10, offset: 2 }}>
                                {getFieldDecorator('province', this.getRules('Please select a region'))(
                                    <Select placeholder="省" onChange={this.changeProvince}>
                                        {provinceList.map(item => <Option key={item.id} value={item.province}>{item.province}</Option>)}
                                    </Select>
                                )}
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item wrapperCol={{ span: 20, offset: 2 }}>
                                {getFieldDecorator('city', this.getRules('Please select a region'))(
                                    <Select placeholder="市" onChange={this.changeCity}>
                                        {cityList.map(item => <Option key={item.id} value={item.city}>{item.city}</Option>)}
                                    </Select>
                                )}
                            </Item>
                        </Col>
                        <Col span={6}>
                            <Item wrapperCol={{ span: 20, offset: 0 }}>
                                {getFieldDecorator('county', this.getRules('Please select a region'))(
                                    <Select placeholder="区" >
                                        {countyList.map(item => <Option key={item.id} value={item.county}>{item.county}</Option>)}
                                    </Select>
                                )}
                            </Item>
                        </Col>
                    </Col>
                )
            } else {
                return (
                    <Col key={item.key} span={12}>
                        <Item label={item.title}>
                            {getFieldDecorator(item.key, this.getRules(`${item.key} is required`, "share"))(
                                <Radio.Group>
                                    <Radio value="share"> 共享 &nbsp;&nbsp; </Radio>
                                    <Radio value="self"> 独占</Radio>
                                </Radio.Group>
                            )}
                        </Item>
                    </Col>
                )
            }
        })
    }

    componentDidMount() {
        this.props.getProvinceList()
    }

    changeProvince = (value) => {
        const provinceList = this.props.businessorder._root.entries[0][1];
        let id = ''
        provinceList.forEach(item => {
            if (value === item.province) {
                id = item.id
            }
        })
        this.props.getCityList(id)
        this.props.form.resetFields(['city', 'county'])
    }

    changeCity = (value) => {
        const cityList = this.props.businessorder._root.entries[1][1]
        let id = '';
        cityList.forEach(item => {
            if (value === item.city) {
                id = item.id
            }
        })
        this.props.getCountyList(id);
        this.props.form.resetFields(['county']);
    }

    handleSubmit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                // 模拟请求
                // let userId = 'admin'
                // let slicing_order_info = {}
                // axiospost(APIS.createOrder(userId),{slicing_order_info}).then(res => {
                //     if(res.result_code === '200'){
                //         console.log('创建成功')
                //     }
                // }) 
                this.props.history.push('/ordermgt');
            }
        })
    }

    handleOrderCancel = () => {
        this.props.history.goBack();
    }

    render() {
        const { t } = this.props
        const formItemLayout = { labelCol: { span: 5, offset: 1 }, wrapperCol: { span: 8, offset: 1 } }
        return (
            <div className="orderdetail">
                <Card title={t('Create Slicing Order')}>
                    <Form {...formItemLayout}>
                        <Row className="orderdetail_formItem__margin">
                            {this.getFormItem()}
                        </Row>
                        <Form.Item wrapperCol={{ span: 16, offset: 9 }}>
                            <Button onClick={this.handleOrderCancel} className='orderdetail_button__margin orderdetail_button__padding'>取消</Button>
                            <Button type='primary' onClick={this.handleSubmit} className='orderdetail_button__padding'>确认</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default withNamespaces()(Form.create({})(connect(
    state => ({ businessorder: state.businessorder }),
    actions
)(withRouter(BusinessOrderDetail))));