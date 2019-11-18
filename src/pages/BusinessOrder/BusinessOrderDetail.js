import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions } from './actions'
import { Card, Form, Col, Input, Select, Radio, Button, Row, Popover } from "antd";
import { ORDER_CREATE_FORM } from '../../constant/constants'
import Address from './Address'
import { axiospost, axiosget } from '../../utils/http'
import APIS from '../../constant/apis'

import './BusinessOrderDetail.less';

class BusinessOrderDetail extends Component {

    getRules = title => ({required: true, message: `请输入${title}`})

    getFormItem = () => {
        const { form: { getFieldDecorator } } = this.props;
        const { Item } = Form
        
        return ORDER_CREATE_FORM.map( item => {
            if (item.key === 'name') {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={item.title}>
                            {getFieldDecorator(item.key, { rules: [...item.rules, this.getRules(item.title)], validateFirst: true} )(<Input />)}
                        </Item>
                    </Col>
                )
            } else if (item.content) {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={item.title}>
                            <Popover placement="right" content={item.content} trigger="click">
                                {getFieldDecorator(item.key, {
                                    rules: [this.getRules(item.title), {validator: (rule, value, callback) => this.validator (item.content, rule, value, callback)}], 
                                    validateFirst: true})(<Input />)}
                            </Popover>
                        </Item>
                    </Col>
                )
            } else if (item.options) {
                return (
                    <Col span={12} key={item.key}>
                            <Item label={item.title}>
                                {getFieldDecorator(item.key, {rules: [{required: true, message: `请选择${item.title}`}], initialValue: item.options[0]})(
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
                            {getFieldDecorator(item.key, {rules: [{required: true, message: `请选择${item.title}`}], initialValue: 'share'})(
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

    validator = (content, rule, value, callback) => {
        // 校验输入的必须为数字且不能以0开头
        if (!/^\d*$/.test(value)) {
            callback('只能输入数字')
        } else if (!value.indexOf('0')){
            callback(content)
        } else {
            // 限制取值范围
            let confine = content.slice(6)
            if (confine.indexOf('≥') === -1) {
                confine = confine.split('-')
                if ( value && (value*1 < confine[0] || value*1 > confine[1])) {
                    callback(content)
                }
            } else {
                if ( value && value*1 >= confine.slice(0)) {
                    callback(connect)
                }
            }
        }
        callback()
    }

    getValues = areaObj => {
        this.areaList.push(areaObj)
    }

    addhandleSubmit = event => {
        if(!this.areaSubmitList) {
            this.areaSubmitList = []
        }
        this.areaSubmitList.push(event)
    }

    handleSubmit = () => {
        this.areaSubmitList.forEach( item => {
            item()
        })
        this.props.form.validateFields((error, values) => {
            if (!error) {
                let flag = this.areaList.every(item => item === null)
                if(!flag){
                    // 模拟请求
                    let slicing_order_info = {...values,coverageArea: JSON.stringify(this.areaList)}
                    console.log(slicing_order_info)
                    // axiospost(APIS.createOrder,{slicing_order_info}).then(res => {
                    //     if(res.result_code === '200'){
                    //         console.log('创建成功')
                    //     }
                    // }) 
                    // this.props.history.push('/ordermgt');
                }
            }
        })
    }

    handleOrderCancel = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        // this.props.getProvinceList()
        this.props.getAddressApi()
        this.areaList = []
    }
    
    render() {
        const { t } = this.props
        const formItemLayout = { labelCol: { span: 8, offset: 0 }, wrapperCol: { span: 8, offset: 0 }}
        const formItem = this.props.businessorder.get('formItem').toJS()

        return (
            <div className="orderdetail">
                <Card title={t('Create Slicing Order')}>
                    <Form {...formItemLayout} labelAlign='left'>
                        <Row className="orderdetail_formItem__margin">
                            {this.getFormItem()}
                        </Row>
                    </Form>
                    {ORDER_CREATE_FORM.map(item => {
                        if (item.key === 'area') {
                            return (
                                formItem.map((ite, index) => {
                                    let formItemLayout = null
                                    if(ite === formItem[0]){
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
                                        <Address formItemLayout={formItemLayout} key={ite.id} index={index} data={ite} getValues={this.getValues} addhandleSubmit={this.addhandleSubmit}/>
                                    )
                                })
                            )
                        }}
                    )}
                    <div className="orderdetail_btns">
                        <Button onClick={this.handleOrderCancel}>取消</Button>
                        <Button type='primary' onClick={this.handleSubmit}>确认</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withNamespaces()(Form.create({})(connect(
    state => ({ businessorder: state.businessorder }),
    actions
)(withRouter(BusinessOrderDetail))));