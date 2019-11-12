import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from './actions'
import { Card, Form, Col, Input, Select, Radio, Button, Row, Popover, Icon } from "antd";
import { ORDER_CREATE_FORM } from '../../constant/constants'
import { axiospost, axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

import './BusinessOrderDetail.less';

class BusinessOrderDetail extends Component {

    getRules = (message, initialValue) => ({ rules: [{ required: true, message }], initialValue })

    handleAddArea = () => {
        const formItem = this.props.businessorder.get('formItem').toJS()
        if(formItem.length === 10){
            return
        }
        this.props.addFormItem(formItem.length+1)
    }

    handleReduceArea = (index) => {
        // let formItem = [...this.state.formItem]
        // formItem.splice(index,1)
        // this.setState({formItem})
        this.props.deleteFormItem(index)
    }


    getFormItem = () => {
        const { form: { getFieldDecorator } } = this.props;
        const { Item } = Form
        const { Option } = Select
        const provinceList = this.props.businessorder.get('provinceList').toJS()
        const formItem = this.props.businessorder.get('formItem').toJS()


        return ORDER_CREATE_FORM.map(item => {
            if (item.key === 'businessName') {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={item.title}>
                            {getFieldDecorator(item.key, this.getRules(`${item.title} is required`))(<Input />)}
                        </Item>
                    </Col>
                )
            } else if (item.content) {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={item.title}>
                            <Popover placement="right" content={item.content} trigger="click">
                                {getFieldDecorator(item.key, this.getRules(`${item.title} is required`))(<Input />)}
                            </Popover>
                        </Item>
                    </Col>
                )
            } else if (item.options) {
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
            } else if (item.key === 'shareLevel') {
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
            } else if (item.key === 'area') {
                return (
                    formItem.map((it, index) => {
                        let formItemLayout =null
                        if(it === formItem[0]){
                            formItemLayout = {
                                label: item.title,
                                labelCol: {span: 10, offset: 0},
                                wrapperCol: {span: 11, offset: 2}
                            }
                        }else{
                            formItemLayout = {
                                wrapperCol: {span: 11, offset: 12}
                            }
                        }
                        return (
                            <Col span={24} key={it.id}>
                                <Col span={8}>
                                    <Item {...formItemLayout}>
                                        {getFieldDecorator('province'+it.id, this.getRules('Please select a region'))(
                                            <Select placeholder="省" onChange={(value) => this.changeProvince(value, index, it.id)}>
                                                {provinceList.map(item => <Option key={item.id} value={item.province}>{item.province}</Option>)}
                                            </Select>
                                        )}
                                    </Item>
                                </Col>
                                <Col span={4}>
                                    <Item wrapperCol={{ span: 22, offset: 0 }}>
                                        {getFieldDecorator('city'+it.id, this.getRules('Please select a region'))(
                                            <Select placeholder="市" onChange={(value) => this.changeCity(value, index, it.id)}>
                                                {it.cityList.map(item => <Option key={item.id} value={item.city}>{item.city}</Option>)}
                                            </Select>
                                        )}
                                    </Item>
                                </Col>
                                <Col span={4}>
                                    <Item wrapperCol={{ span: 22, offset: 0 }}>
                                        {getFieldDecorator('county'+it.id, this.getRules('Please select a region'))(
                                            <Select placeholder="区" onChange={(value) => this.changeCounty(value, index, it.id)}>
                                                {it.countyList.map(item => <Option key={item.id} value={item.county}>{item.county}</Option>)}
                                            </Select>
                                        )}
                                    </Item>
                                </Col>
                                <Col span={4}>
                                    <Item wrapperCol={{ span: 22, offset: 0 }}>
                                        {getFieldDecorator('street'+it.id, this.getRules('Please select a region'))(
                                            <Select placeholder="街道" >
                                                {it.streetList.map(item => <Option key={item.id} value={item.street}>{item.street}</Option>)}
                                            </Select>
                                        )}
                                    </Item>
                                </Col>
                                {it === formItem[0] ? (
                                    <Icon 
                                        type="plus-square" 
                                        theme="filled" 
                                        className={formItem.length === 10 ? 'orderdetail_icon_disabled':"orderdetail_icon"}
                                        onClick={this.handleAddArea}
                                    />) : (<Icon
                                            type="minus-square" 
                                            theme="filled"
                                            className="orderdetail_icon" 
                                            onClick={() => this.handleReduceArea(index)}
                                        />)}
                            </Col>
                        )
                    })
                )
            }
        })
    }

    componentDidMount() {
        this.props.getProvinceList()
    }

    changeProvince = (value, index, itemId) => {
        const provinceList = this.props.businessorder.get('provinceList').toJS();
        let id = ''
        provinceList.forEach(item => {
            if (value === item.province) {
                id = item.id
            }
        })
        this.props.getCityList(id, index)
        this.props.form.resetFields(['city'+ itemId, 'county'+ itemId, 'street'+ itemId])
    }

    changeCity = (value, index, itemId) => {
        const cityList = this.props.businessorder.getIn(['formItem', index]).toJS().cityList;
        let id = '';
        cityList.forEach(item => {
            if (value === item.city) {
                id = item.id
            }
        })
        this.props.getCountyList(id, index);
        this.props.form.resetFields(['county'+ itemId, 'street'+ itemId]);
    }

    changeCounty= (value, index, itemId) => {
        const countyList = this.props.businessorder.getIn(['formItem', index]).toJS().countyList;
        let id = '';
        countyList.forEach(item => {
            if (value === item.county) {
                id = item.id
            }
        })
        this.props.getStreetList(id, index);
        this.props.form.resetFields(['street'+ itemId]);
    }

    handleSubmit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log(values)
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
        const formItemLayout = { labelCol: { span: 8, offset: 0 }, wrapperCol: { span: 8, offset: 0 }}
        return (
            <div className="orderdetail">
                <Card title={t('Create Slicing Order')}>
                    <Form {...formItemLayout} labelAlign='left'>
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