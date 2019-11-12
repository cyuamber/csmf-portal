import React from 'react';
import { withNamespaces } from 'react-i18next'
import { Select } from 'antd'
import BusinessMGTTable from '../../components/BusinessMGTTable/BusinessMGTTable'
import { SELECT_OPTIONS } from '../../constant/constants'

import './BusinessManagement.less'

class BusinessManagement extends React.Component {

    state = {
        status: 'all'
    }

    selectStatus = (status) => {
        this.setState({status})
    }

    render() {
        const { t } = this.props
        
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
                    <BusinessMGTTable status={this.state.status}/>
                </div>
            </div>
        );
    }
}

export default withNamespaces()(BusinessManagement)