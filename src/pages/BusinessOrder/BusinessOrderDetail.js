import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from './actions';
import { Card, Form, Col, Input, Select, Radio, Button, Row, Popover, message } from "antd";
import { ORDER_CREATE_FORM } from '../../constant/constants';
import Address from './Address';
import { axiospost } from '../../utils/http';
import APIS from '../../constant/apis';

import './BusinessOrderDetail.less';

class BusinessOrderDetail extends Component {

    getRules = title => {
        const { t } = this.props;
        return { required: true, message: t('Please enter') + ' ' + t(title) }
    }

    getFormItem = () => {
        const { t, form: { getFieldDecorator } } = this.props;
        const { Item } = Form;

        return ORDER_CREATE_FORM.map(item => {
            if (item.key === 'name') {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={t(item.title)}>
                            {getFieldDecorator(item.key, { rules: [{ max: 50, message: t('Slicing business name cannot exceed 50 characters') }, this.getRules(item.title)], validateFirst: true })(<Input />)}
                        </Item>
                    </Col>
                )
            } else if (item.content) {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={t(item.title)}>
                            <Popover placement="right" content={t(item.content) + item.scope} trigger="click">
                                {getFieldDecorator(item.key, {
                                    rules: [this.getRules(item.title), { validator: (rule, value, callback) => this.validator(item.content, item.scope, rule, value, callback) }],
                                    validateFirst: true
                                })(<Input />)}
                            </Popover>
                        </Item>
                    </Col>
                )
            } else if (item.options) {
                return (
                    <Col span={12} key={item.key}>
                        <Item label={t(item.title)}>
                            {getFieldDecorator(item.key, { rules: [{ required: true, message: t('Please choose') + ' ' + t(item.title) }], initialValue: item.options[0].value })(
                                <Select>
                                    {item.options.map(ite => <Select.Option key={ite.value} >{t(ite.value)}</Select.Option>)}
                                </Select>
                            )}
                        </Item>
                    </Col>
                )
            } else if (item.key === 'resourceSharingLevel') {
                return (
                    <Col key={item.key} span={12}>
                        <Item label={t(item.title)}>
                            {getFieldDecorator(item.key, { rules: [{ required: true, message: t('Please choose') + ' ' + t(item.title) }], initialValue: 'shared' })(
                                <Radio.Group>
                                    <Radio value="shared">{t('Shared')}&nbsp;&nbsp; </Radio>
                                    <Radio value="non-shared">{t('Non-shared')}</Radio>
                                </Radio.Group>
                            )}
                        </Item>
                    </Col>
                )
            }
        })
    }

    validator = (content, scope, rule, value, callback) => {
        const { t } = this.props; 
        // 校验输入的必须为数字且不能以0开头
        if (!/^\d*$/.test(value)) {
            callback(t('Only numbers can be entered'));
        } else if (!value.indexOf('0')) {
            callback(t(content) + scope);
        } else {
            // 限制取值范围
            let confine = scope.slice(2);
            if (confine.indexOf('≥') === -1) {
                confine = confine.split('-');
                if (value && (value * 1 < confine[0] || value * 1 > confine[1])) {
                    callback(t(content) + scope);
                }
            } else {
                if (value && value * 1 >= confine.slice(0)) {
                    callback(t(content) + scope);
                }
            }
        }
        callback();
    }

    getValues = areaObj => {
        this.areaList.push(areaObj);
    }

    addhandleSubmit = event => {
        if (!this.areaSubmitList) {
            this.areaSubmitList = [];
        }
        this.areaSubmitList.push(event);
    }

    handleSubmit = () => {
        const { t } = this.props;
        this.areaSubmitList.forEach(item => {
            item();
        })
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.props.setBtnLoading(true);
                const flag = this.areaList.includes(null);
                if (!flag) {
                    // 获取游牧性的key
                    let mobilityLevel = '';
                    ORDER_CREATE_FORM.forEach(item => {
                        if (item.key === 'mobilityLevel') {
                            item.options.forEach(ite => {
                                if (ite.value === values.mobilityLevel) {
                                    mobilityLevel = ite.key;
                                }
                            })
                        }
                    })
                    const slicing_order_info = { ...values, mobilityLevel, coverageArea: JSON.stringify(this.areaList) };
                    axiospost(APIS.createOrderApi, { slicing_order_info }).then(res => {
                        if (+res.result_header.result_code === 200) {
                            this.props.setBtnLoading(false);
                            this.props.history.push('/ordermgt');
                        } else {
                            this.props.setBtnLoading(false);
                            message.error(res.result_header.result_message || t('Create Failed'));
                        }
                    })
                }
            }
            this.areaList = [];
        })
    }

    handleOrderCancel = () => {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.props.getAddressApi();
        this.areaList = [];
    }

    render() {
        const { t } = this.props;
        const formItemLayout = { labelCol: { span: 9, offset: 0 }, wrapperCol: { span: 9, offset: 0 } };
        const formItem = this.props.businessorder.get('formItem').toJS();
        const loading = this.props.businessorder.get('btnLoading');

        return (
            <div className="orderdetail">
                <Card title={t('Create Slicing Order')}>
                    <Form {...formItemLayout} labelAlign='left'>
                        <Row className="orderdetail_formItem__margin">
                            {this.getFormItem()}
                        </Row>
                    </Form>
                    {ORDER_CREATE_FORM.map(item => {
                        if (item.key === 'coverageArea') {
                            return (
                                formItem.map((ite, index) => {
                                    let formItemLayout = null
                                    if (ite === formItem[0]) {
                                        formItemLayout = {
                                            label: t(item.title),
                                            labelCol: { span: 9, offset: 0 },
                                            wrapperCol: { span: 11, offset: 3 }
                                        }
                                    } else {
                                        formItemLayout = {
                                            wrapperCol: { span: 11, offset: 12 }
                                        }
                                    }
                                    return (
                                        <Address formItemLayout={formItemLayout} key={ite.id} index={index} data={ite} getValues={this.getValues} addhandleSubmit={this.addhandleSubmit} />
                                    )
                                })
                            )
                        }
                    }
                    )}
                    <div className="orderdetail_btns">
                        <Button onClick={this.handleOrderCancel}>{t('Cancel')}</Button>
                        <Button type='primary' onClick={this.handleSubmit} loading={loading}>{t('Submit')}</Button>
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