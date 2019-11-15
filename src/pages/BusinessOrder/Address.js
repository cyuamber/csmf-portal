import React, { Component } from 'react'
import { Form, Col, Select, Icon } from 'antd'
import { connect } from 'react-redux'
import { actions } from './actions'

class Address extends Component {

    handleAddArea = () => {
        this.id ++
        this.props.addFormItem(this.id)
    }
    handleReduceArea = () => {
        const { deleteFormItem, index } = this.props
        deleteFormItem(index)
    }
    
    getRules = message => ({ rules: [{ required: true, message }]})

    changeProvince = value => {
        const provinceList = this.props.businessorder.get('provinceList').toJS();
        const { index, data } = this.props
        let id = ''
        provinceList.forEach(item => {
            if (value === item.province) {
                id = item.id
            }
        })
        this.props.getCityList(id, index)
        this.props.form.resetFields(['city'+ data.id, 'county'+ data.id, 'street'+ data.id])
    }
    changeCity = value => {
        const { index, data } = this.props
        const cityList = this.props.businessorder.getIn(['formItem', index]).toJS().cityList;
        let id = ''
        cityList.forEach(item => {
            if (value === item.province) {
                id = item.id
            }
        })
        this.props.getCountyList(id, index)
        this.props.form.resetFields(['county'+ data.id, 'street'+ data.id])
    }
    changeCounty = value => {
        const { index, data } = this.props
        const countyList = this.props.businessorder.getIn(['formItem', index]).toJS().countyList;
        let id = '';
        countyList.forEach(item => {
            if (value === item.county) {
                id = item.id
            }
        })
        this.props.getStreetList(id, index);
        this.props.form.resetFields(['street'+ data.id]);
    }

    componentDidMount () {
        this.id = 1
    }

    render() {
        const { Item } = Form
        const { Option } = Select
        const { formItemLayout, index, businessorder, data, form: {getFieldDecorator} } = this.props
        const provinceList = businessorder.get('provinceList').toJS()
        const formItem = businessorder.get('formItem').toJS()

        return (
            <div>
                <Col span={8}>
                    <Item {...formItemLayout}>
                        {getFieldDecorator('province', this.getRules('Please select a region'))(
                            <Select placeholder="省" onChange={(value) => this.changeProvince(value, index)}>
                                {provinceList.map(item => <Option key={item.id} value={item.province}>{item.province}</Option>)}
                            </Select>
                        )}
                    </Item>
                </Col>
                <Col span={4}>
                    <Item wrapperCol={{ span: 22, offset: 0 }}>
                        {getFieldDecorator('city', this.getRules('Please select a region'))(
                            <Select placeholder="市" onChange={(value) => this.changeCity(value)}>
                                {data.cityList.map(item => <Option key={item.id} value={item.city}>{item.city}</Option>)}
                            </Select>
                        )}
                    </Item>
                </Col>
                <Col span={4}>
                    <Item wrapperCol={{ span: 22, offset: 0 }}>
                        {getFieldDecorator('county', this.getRules('Please select a region'))(
                            <Select placeholder="区" onChange={(value) => this.changeCounty(value)}>
                                {data.countyList.map(item => <Option key={item.id} value={item.county}>{item.county}</Option>)}
                            </Select>
                        )}
                    </Item>
                </Col>
                <Col span={4}>
                    <Item wrapperCol={{ span: 22, offset: 0 }}>
                        {getFieldDecorator('street', this.getRules('Please select a region' ))(
                            <Select placeholder="街道" >
                                {data.streetList.map(item => <Option key={item.id} value={item.street}>{item.street}</Option>)}
                            </Select>
                        )}
                    </Item>
                </Col>
                {index ? (<Icon
                            type="minus-square" 
                            theme="filled"
                            className="orderdetail_icon" 
                            onClick={this.handleReduceArea}
                        />): ( <Icon 
                            type="plus-square" 
                            theme="filled" 
                            className={formItem.length === 10 ? 'orderdetail_icon_disabled':"orderdetail_icon"}
                            onClick={this.handleAddArea}
                        />) }
            </div>
        )
    }
}
export default connect(
    state => ({ businessorder: state.businessorder }),
    actions
)(Form.create({})(Address))