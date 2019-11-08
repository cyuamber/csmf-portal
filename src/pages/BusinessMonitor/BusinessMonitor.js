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
        this.fetchTableData();
    }

    fetchTableData() {
        const { changeTable, tableLoading } = this.props;
        tableLoading(true);
        axiosget(APIS.testapi).then(res => {
            if (res) {
                changeTable(res, false)
                this.fetchTrafficData();
                this.fetchOnlineusersData();
                this.fetchBandwidthData();
            } else {
                message.error("system error")
            }
        })
    }
    fetchTrafficData() {
        const { setTrafficData } = this.props;
        axiosget(APIS.traffic).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                setTrafficData(res.result_body);
            } else {
                message.error('get traffic data error');
            }
        })
    }
    fetchOnlineusersData() {
        const { setOnlineusersData } = this.props;
        axiosget(APIS.onlineUsers).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                setOnlineusersData(res.result_body);
            } else {
                message.error('get online users data error');
            }
        })
    }
    fetchBandwidthData() {
        const { setBandwidthData } = this.props;
        axiosget(APIS.bandwidth).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                setBandwidthData(res.result_body);
            } else {
                message.error('get bandwidth data error');
            }
        })
    }
    processPieData = (chartData, chartName = "traffic") => {
        let trafficLegendArr = [];
        let trafficSeriesArr = [];
        let trafficName = "";
        if (chartName === "traffic") {
            trafficName = "切片使用流量";
            chartData.data.forEach(item => {
                trafficLegendArr.push(item.service_id);
                trafficSeriesArr.push({ value: item.traffic_data, name: item.service_id });
            });
        }
        return { arr: trafficLegendArr, value: trafficSeriesArr, legendName: trafficName }
    }
    processLineData = (lineData, lineName = "onlineusers") => {
        let LegendArr = [];
        let LegendxAxis = [];
        let LegendData = [];

        lineData.data.forEach((item, index) => {
            LegendArr.push(item.service_id);
            if (index === 0) {
                if (lineName === "onlineusers") {
                    LegendxAxis.push(item.online_user_list.forEach(_ => {
                        if (typeof (_.timestamp) === "string") {
                            LegendxAxis.push(_.timestamp)
                        }
                    }));
                } else if (lineName === "bandwidth") {
                    LegendxAxis.push(item.total_bandwidth_list.forEach(_ => {
                        if (typeof (_.timestamp) === "string") {
                            LegendxAxis.push(_.timestamp)
                        }
                    }));
                }
                LegendxAxis.pop();
            }
            let LegendDataNumber = [];
            if (lineName === "onlineusers") {
                item.online_user_list.forEach(t => {
                    LegendDataNumber.push(t.online_users);
                })
                LegendData.push({
                    name: item.service_id,
                    type: 'line',
                    data: LegendDataNumber
                })
            } else if (lineName === "bandwidth") {
                item.total_bandwidth_list.forEach(t => {
                    LegendDataNumber.push(t.total_bandwidth);
                })
                LegendData.push({
                    name: item.service_id,
                    type: 'line',
                    data: LegendDataNumber
                })
            }
        })

        return { legend: LegendArr, xAxis: LegendxAxis, value: LegendData }
    }

    render() {
        const tableData = this.props.businessmonitor.get('table').toJS();
        const trafficData = this.props.businessmonitor.get('traffic').toJS();
        const onlineusersData = this.props.businessmonitor.get('onlineusers').toJS();
        const bandwidthData = this.props.businessmonitor.get('bandwidth').toJS();

        let trafficConfig = this.processPieData(trafficData, "traffic");
        let onlineusersConfig = this.processLineData(onlineusersData, "onlineusers");
        let bandwidthConfig = this.processLineData(bandwidthData, "bandwidth");

        console.log(onlineusersConfig, bandwidthConfig)
        return (
            <div className="businessmonitor">
                <DatePicker showTime />
                <Row type="flex" gutter={16} justify="space-around" className="businessmonitor_imagecontainer">
                    <Col span={6}>
                        <Chartbox chartConfig={pieChartconfig} pieExtraConfig={trafficConfig} chartName={"切片使用流量"} chartStyle={chartStyle} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} lineExtraConfig={onlineusersConfig} chartName={"在线用户数量"} chartStyle={chartStyle} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} lineExtraConfig={bandwidthConfig} chartName={"切片总带宽"} chartStyle={chartStyle} />
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