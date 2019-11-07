import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import { Row, Col, Table, DatePicker, message } from 'antd';
import { axiosget } from 'utils/http';
import APIS from 'constant/apis';

import { chartConfig, chartStyle, pieChartconfig, tableColumns } from './constants';
import Chartbox from 'components/charts/chartbox';

import "./style.less"

class BusinessMonitor extends React.Component {
    state = {}

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { changeTable, tableLoading, fetchBandwidthData } = this.props;
        tableLoading(true);
        axiosget(APIS.testapi).then(res => {
            changeTable(res, false)
        })
        axiosget(APIS.traffic).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                fetchBandwidthData(res.result_body);
            } else {
                message.error('wrong');
            }
        })
    }

    render() {
        const tableData = this.props.businessmonitor.get('table').toJS();
        const pieData = this.props.businessmonitor.get('bandwidth').toJS();

        let pieLegendArr = [];
        pieData.data.map(item => pieLegendArr.push(item.service_id));
        let pieSeriesArr = [];
        pieData.data.map(item => pieSeriesArr.push({ value: item.traffic_data, name: item.service_id }))
        return (
            <div className="businessmonitor">
                <DatePicker showTime />
                <Row type="flex" gutter={16} justify="space-around" className="businessmonitor_imagecontainer">
                    <Col span={6}>
                        <Chartbox chartConfig={pieChartconfig} pieExtraConfig={{ arr: pieLegendArr, value: pieSeriesArr }} chartName={"切片使用流量"} chartStyle={chartStyle} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} chartName={"在线用户数量"} chartStyle={chartStyle} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} chartName={"切片总带宽"} chartStyle={chartStyle} />
                    </Col>
                </Row>

                <Table
                    className="businessmonitor_table"
                    loading={tableData.loading}
                    rowKey={(record, index) => index}
                    dataSource={tableData.data}
                    columns={tableColumns} />
            </div>
        );
    }
}
export default connect(
    state => ({ businessmonitor: state.businessmonitor }),
    actions
)(BusinessMonitor)