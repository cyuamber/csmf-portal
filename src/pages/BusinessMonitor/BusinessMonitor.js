import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { actions } from './actions';
import { Row, Col, Table, DatePicker, message } from 'antd';
import { axiosget } from 'utils/http';
import APIS from 'constant/apis';
import BusinessMGTTable from '../../components/BusinessMGTTable/BusinessMGTTable'

import { chartConfig, chartStyle, pieChartconfig, tableColumns } from './constants';
import Chartbox from 'components/charts/chartbox';

import "./style.less"
import moment from 'moment';

class BusinessMonitor extends React.Component {

    state = {}

    // componentDidMount() {
    //     this.fetchTableData();
    // }

    componentDidUpdate() {
        const tableList = this.props.businessmonitor.get('tableData').toJS().data
        const trafficList = this.props.businessmonitor.get('traffic').toJS().data
        const onlineuserList = this.props.businessmonitor.get('onlineusers').toJS().data
        const bandwidthList = this.props.businessmonitor.get('bandwidth').toJS().data
        if(tableList.length && !trafficList.length && !onlineuserList.length && !bandwidthList.length){
            this.getChartsData()
        }
    }

    // fetchTableData() {
    //     const { changeTable, tableLoading } = this.props;
    //     tableLoading(true);
    //     axiosget(APIS.testapi).then(res => {
    //         if (res) {
    //             changeTable(res, false)
    //             this.fetchTrafficData();
    //             this.fetchOnlineusersData();
    //             this.fetchBandwidthData();
    //         } else {
    //             message.error("system error")
    //         }
    //     })
    // }

    getChartsData = (time = new Date().getTime()) => {
        let serviceList = []
        const tableList = this.props.businessmonitor.get('tableData').toJS().data
        tableList.forEach (item => {
            serviceList.push(item.service_id)
        })
        this.fetchTrafficData(serviceList, time);
        this.fetchOnlineusersData(serviceList, time);
        this.fetchBandwidthData(serviceList, time);
    }

    fetchTrafficData(serviceList, time) {
        const { setTrafficData } = this.props;
        // url中的参数
        // APIS.traffic(time)
        axiosget(APIS.traffic, {serviceList}).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                setTrafficData(res.result_body);
            } else {
                message.error('get traffic data error');
            }
        })
    }
    fetchOnlineusersData(serviceList, time) {
        const { setOnlineusersData } = this.props;
        // url中的参数
        // const page_size = this.props.businessmonitor.get('page_size')
        // APIS.onlineUsers(time, page_size)
        axiosget(APIS.onlineUsers, {serviceList}).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                setOnlineusersData(res.result_body);
            } else {
                message.error('get online users data error');
            }
        })
    }
    fetchBandwidthData(serviceList, time) {
        const { setBandwidthData } = this.props;
        // url中的参数
        // const page_size = this.props.businessmonitor.get('page_size')
        // APIS.bandwidth(time, page_size)
        axiosget(APIS.bandwidth, {serviceList}).then(res => {
            if (res.result_header && +res.result_header.result_code === 200) {
                setBandwidthData(res.result_body);
            } else {
                message.error('get bandwidth data error');
            }
        })
    }
    processPieData = (chartData, chartName = "traffic") => {
        const { t } = this.props;
        let trafficLegendArr = [];
        let trafficSeriesArr = [];
        let trafficName = "";
        if (chartName === "traffic") {
            trafficName = t("Slicing Traffic");
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
    setDisabledDate = (current) => {
        if (!current) {
            return false
        } else {
            return current > moment()
        }
    }
    changeDate = (date) => {
        // clear
        if (this.dateObj && !date) {
            this.getChartsData()
        } 
        this.dateObj = date
    }
    selectedDate = status => {
        if(!status){
            const { dateObj, getChartsData } = this
            console.log(dateObj)
            if(dateObj){
                console.log(111)
                getChartsData(dateObj.valueOf())
            }
        }
    }


    render() {
        const { t } = this.props;
        const tableData = this.props.businessmonitor.get('table').toJS();
        const trafficData = this.props.businessmonitor.get('traffic').toJS();
        const onlineusersData = this.props.businessmonitor.get('onlineusers').toJS();
        const bandwidthData = this.props.businessmonitor.get('bandwidth').toJS();

        let trafficConfig = this.processPieData(trafficData, "traffic");
        let onlineusersConfig = this.processLineData(onlineusersData, "onlineusers");
        let bandwidthConfig = this.processLineData(bandwidthData, "bandwidth");

        // console.log(onlineusersConfig, bandwidthConfig)
        return (
            <div className="businessmonitor">
                <DatePicker showTime disabledDate={this.setDisabledDate} onChange={this.changeDate} onOpenChange={this.selectedDate}/>
                <Row type="flex" gutter={16} justify="space-around" className="businessmonitor_imagecontainer">
                    <Col span={6}>
                        <Chartbox chartConfig={pieChartconfig} pieExtraConfig={trafficConfig} chartName={t("Slicing Traffic")} chartStyle={chartStyle} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} lineExtraConfig={onlineusersConfig} chartName={t("Onlines Users")} chartStyle={chartStyle} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} lineExtraConfig={bandwidthConfig} chartName={t("Slicing Bandwidth")} chartStyle={chartStyle} />
                    </Col>
                </Row>

                {/* <Table
                    className="businessmonitor_table"
                    loading={tableData.loading}
                    rowKey={(record, index) => index}
                    dataSource={tableData.data}
                    columns={tableColumns} /> */}
                <BusinessMGTTable className="businessmonitor_table" getChartsData={this.getChartsData}/>
            </div>
        );
    }
}
export default withNamespaces()(connect(
    state => ({ businessmonitor: state.businessmonitor }),
    actions
)(BusinessMonitor))