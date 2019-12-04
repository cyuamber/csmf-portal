import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Form, Row, Col, Select, Icon } from 'antd';
import { connect } from 'react-redux';
import { actions } from './actions';

class Address extends Component {

    handleAddArea = () => {
        this.id++;
        this.props.addFormItem(this.id);
    }
    handleReduceArea = () => {
        const { deleteFormItem, index } = this.props;
        deleteFormItem(index);
    }

    getRules = message => ({ rules: [{ required: true, message }] })

    changeProvince = value => {
        const { index, businessorder, getCityList, form } = this.props;
        const address = businessorder.get('address').toJS();
        let cityList = [];
        address.forEach(item => {
            if (value === item.name) {
                cityList = item.city;
            }
        })
        getCityList(cityList, index);
        form.resetFields(['city', 'county', 'street']);

    }
    changeCity = value => {
        const { index, businessorder, getCountyList, form } = this.props;
        const cityList = businessorder.get('formItem').toJS()[index].cityList;
        let countyList = [];
        cityList.forEach(item => {
            if (value === item.name) {
                countyList = item.county;
            }
        })
        getCountyList(countyList, index);
        form.resetFields(['county', 'street']);

    }
    changeCounty = value => {
        const { index, businessorder, getStreetList, form } = this.props;
        const countyList = businessorder.get('formItem').toJS()[index].countyList;
        let streetList = [];
        countyList.forEach(item => {
            if (value === item.name) {
                streetList = item.street;
            }
        })
        getStreetList(streetList, index);
        form.resetFields(['street']);
    }

    handleSubmit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.props.getValues(values);
            } else {
                this.props.getValues(null);
            }
        })
    }

    componentDidMount() {
        this.props.addhandleSubmit(this.handleSubmit);
        this.id = 1;
    }

    render() {
        const { Item } = Form;
        const { Option } = Select;
        const { formItemLayout, index, businessorder, data, t, form: { getFieldDecorator } } = this.props;
        const address = businessorder.get('address').toJS();
        const formItem = businessorder.get('formItem').toJS();

        return (
            <Form onSubmit={this.handleSubmit} labelAlign='left'>
                <Row>
                    <Col span={9}>
                        <Item {...formItemLayout}>
                            {getFieldDecorator('province', this.getRules(t('Please select a') + t('Province')))(
                                <Select placeholder={t('Province')} onChange={this.changeProvince}>
                                    {address.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
                                </Select>
                            )}
                        </Item>
                    </Col>
                    <Col span={4}>
                        <Item wrapperCol={{ span: 22, offset: 0 }}>
                            {getFieldDecorator('city', this.getRules(t('Please select a') + t('City')))(
                                <Select placeholder={t('City')} onChange={this.changeCity}>
                                    {data.cityList.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
                                </Select>
                            )}
                        </Item>
                    </Col>
                    <Col span={4}>
                        <Item wrapperCol={{ span: 22, offset: 0 }}>
                            {getFieldDecorator('county', this.getRules(t('Please select a') + t('District')))(
                                <Select placeholder={t('District')} onChange={this.changeCounty}>
                                    {data.countyList.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
                                </Select>
                            )}
                        </Item>
                    </Col>
                    <Col span={4}>
                        <Item wrapperCol={{ span: 22, offset: 0 }}>
                            {getFieldDecorator('street', this.getRules(t('Please select a') + t('Street')))(
                                <Select placeholder={t('Street')} >
                                    {data.streetList.map(item => <Option key={item.id} value={item.name}>{item.name}</Option>)}
                                </Select>
                            )}
                        </Item>
                    </Col>
                    {index ? (<Icon
                        type="minus-square"
                        theme="filled"
                        className="orderdetail_icon"
                        onClick={this.handleReduceArea}
                    />) : (<Icon
                        type="plus-square"
                        theme="filled"
                        className={formItem.length === 10 ? 'orderdetail_icon_disabled' : "orderdetail_icon"}
                        onClick={this.handleAddArea}
                    />)}
                </Row>
            </Form>
        )
    }
}
export default withNamespaces()(connect(
    state => ({ businessorder: state.businessorder }),
    actions
)(Form.create({})(Address)));