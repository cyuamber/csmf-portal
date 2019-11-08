import React from 'react';
import { withNamespaces } from 'react-i18next'
import { Select, Button, Table, Switch } from 'antd'
import { connect } from 'react-redux'
import { actions } from './actions'
import { axiosput, axiosdelete } from '../../utils/http'
import APIS from '../../constant/apis'

import { SELECT_OPTIONS } from '../../constant/constants'

import './BusinessManagement.less'

class BusinessManagement extends React.Component {

    state = {
        loading: false
    }

    selectStatus = (status) => {
        const {changeTableLoading, getTableData, getParams} = this.props
        changeTableLoading(true)
        getTableData({status})
        getParams({status})
    }

    pageChange = (pageNum, pageSize) => {
        console.log(pageNum, pageSize, 'pageChange')
        const {changeTableLoading, getTableData, getParams} = this.props
        changeTableLoading(true)
        getTableData({pageNum, pageSize})
        getParams({pageNum, pageSize})
    }

    pageSizeChange = (pageNum, pageSize) => {
        console.log(pageNum, pageSize, 'pageSizeChange')
        const {changeTableLoading, getTableData, getParams} = this.props
        changeTableLoading(true)
        getTableData({pageNum, pageSize})

        getParams({pageNum, pageSize})
    }
    
    changeStatus = (serviceId, checked) => {
        const {  businessmgt, getTableData } = this.props
        const status = businessmgt.get('status')
        const pageNum = businessmgt.get('pageNum')
        const pageSize = businessmgt.get('pageSize')
        this.setState({loading: true})
        const url = checked ? APIS.disable : APIS.enable
            axiosput(url).then(res => {
                let {result_header: {result_code}} = res
                if(result_code === '200'){
                    setTimeout(() => {
                        this.setState({loading: false})
                        getTableData({status, pageNum, pageSize})
                    },1000)
                }    
            })
    }

    handleServiceEnd = (serviceId) => {
        const { businessmgt, getTableData } = this.props
        const status = businessmgt.get('status')
        const pageNum = businessmgt.get('pageNum')
        const pageSize = businessmgt.get('pageSize')
        // axiosdelete(APIS.terminate(serviceId))
        axiosdelete(APIS.terminate).then(res => {
            let {result_header: {result_code}} = res
            if(result_code === '200'){
                getTableData({status, pageNum, pageSize})
            }    
        })
    }


    componentDidMount(){
        this.props.changeTableLoading(true)
        this.props.getTableData() 
    }
    render() {
        const { t } = this.props
        const tableData = this.props.businessmgt.get('tableData').toJS()
        // const loading = this.props.businessmgt.get('switchLoading')
        const columns = [
            {
                title: '序号',
                dataIndex: 'index'
            },
            {
                title: '业务列表',
                dataIndex: 'service_id'
            },
            {
                title: '购买时间',
                dataIndex: 'service_creation_time'
            },
            {
                title: '激活时间',
                dataIndex: 'service_enable_time'
            },
            {
                title: '标签',
                dataIndex: 'service_description'
            },
            {
                title: '状态',
                dataIndex: 'service_status',
                render: (text) => text === 'normal'? '已激活': '未激活'
            },
            {
                title: '激活',
                dataIndex: 'activation',
                render: (text,record) => {
                    let isChecked = record.service_status === 'normal'? true : false
                    return <Switch defaultChecked={isChecked} size='small' onChange={(checked) => this.changeStatus(record.service_id, checked)} loading={this.state.loading}/>
                }
            },
            {
                title: '终止',
                dataIndex: 'end',
                render: (text,record) => {
                    let isDisable = record.service_status === 'normal'? true : false
                    return <Button icon='poweroff' shape='circle' disabled={isDisable} onClick={() => this.handleServiceEnd(record.service_id)}></Button>
                }
            }
        ]
        
        return (
            <div className='businessmgt'>
                <h2 className='businessmgt_title'>
                    {t('Slicing Business Management')}
                </h2>
                <div className='businessmgt_content'>
                    <div className='businessmgt_query'>
                        <span className='businessStatus_select-label'>状态 ：</span>
                        <Select 
                          className='businessStatus_select' 
                          defaultValue='all' 
                          onChange={this.selectStatus}
                        >
                            {SELECT_OPTIONS.map(item => {
                                return <Select.Option key={item.key}>
                                            {item.name}
                                        </Select.Option>
                            })}
                        </Select>
                    </div>
                    <Table 
                      columns={columns} 
                      dataSource={tableData.data}
                      rowKey={(record, index) => index}
                      loading={tableData.loading}
                      pagination={{showSizeChanger: true, total: tableData.total, onChange: this.pageChange, onShowSizeChange: this.pageSizeChange}}
                    />
                </div>
            </div>
        );
    }
}

export default withNamespaces()(connect(
    state => ({businessmgt: state.businessmgt}),
    actions
)(BusinessManagement))