import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Row, Col, DatePicker, message } from 'antd';
import moment from 'moment';
import { actions } from './actions';
import { axiospost } from '../../utils/http';
import APIS from 'constant/apis';
import { chartConfig, chartStyle, pieChartconfig } from './constants';

import BusinessMGTTable from '../../components/BusinessMGTTable/BusinessMGTTable';
import Chartbox from 'components/charts/chartbox';
import Loading from 'components/Loading/Loading';

import "./style.less";

class BusinessMonitor extends React.Component {
    state = {
        showLoading: false,
        loading: true,
    };

    getChartsData = (time = new Date().getTime()) => {
        const service_list = [];
        const tableList = this.props.businessmonitor.get('tableData').toJS().data;
        tableList.forEach(item => {
            //KPI端接受snssai的值
            service_list.push({ service_id: item.service_snssai });
        })
        if (!service_list.length) {
            this.setState({ loading: false })
            return
        }
        this.fetchTrafficData(service_list, time);
        this.fetchOnlineusersData(service_list, time);
        this.fetchBandwidthData(service_list, time);
    }

    fetchTrafficData = (service_list, time) => {
        const { setTrafficData } = this.props;
        // url中的参数
        // APIS.trafficApi(time)
        // APIS.traffic
        axiospost(APIS.trafficApi(time), { service_list }).then(res => {
            const { result_header, result_header: { result_code, result_message } } = res;
            if (result_header && +result_code === 200) {
                setTrafficData(res.result_body.slicing_usage_traffic_list);
            } else {
                message.error(result_message || 'get traffic data error', 1);
            }
        }, ({ message: error }) => {
            message.error(error, 1)
        })
    }
    fetchOnlineusersData(service_list, time) {
        const { setOnlineusersData } = this.props;
        // url中的参数
        // APIS.onlineUsersApi(time)
        // APIS.onlineUsers
        axiospost(APIS.onlineUsersApi(time), { service_list }).then(res => {
            const { result_header, result_header: { result_code, result_message } } = res;
            if (result_header && +result_code === 200) {
                setOnlineusersData(res.result_body.slicing_online_user_list);
            } else {
                message.error(result_message || 'get online users data error', 1);
            }
        }, ({ message: error }) => {
            message.error(error, 1);
        })
    }

    fetchBandwidthData(service_list, time) {
        const { setBandwidthData } = this.props;
        // url中的参数
        // APIS.bandwidthApi(time)
        // APIS.bandwidth
        axiospost(APIS.bandwidthApi(time), { service_list }).then(res => {
            const { result_header, result_header: { result_code, result_message } } = res;
            if (result_header && +result_code === 200) {
                setBandwidthData(res.result_body.slicing_total_bandwidth_list);
            } else {
                message.error(result_message || 'get bandwidth data error', 1);
            }
        }, ({ message: error }) => {
            message.error(error, 1);
        })
    }
    processPieData = (chartData, chartName = "traffic") => {
        const { t } = this.props;
        const trafficLegendArr = [];
        const trafficSeriesArr = [];
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
        const LegendArr = [];
        const LegendxAxis = [];
        const LegendData = [];
        const listKey = lineName === "onlineusers" ? 'online_user_list' : 'total_bandwidth_list';
        const key = lineName === "onlineusers" ? 'online_users' : 'total_bandwidth';
        const data = lineData.data.filter(item => item[listKey] && item[listKey].length);
        data.forEach((item, index) => {
            LegendArr.push(item.service_id);
            if (index === 0) {
                LegendxAxis.push(item[listKey].forEach(_ => {
                    if (typeof (_.timestamp) === "string") {
                        LegendxAxis.push(moment(+_.timestamp).format('hh:mm'));
                    }
                }))
                LegendxAxis.pop();
            }
            const LegendDataNumber = [];
            item[listKey].forEach(t => {
                LegendDataNumber.push(t[key]);
            })
            LegendData.push({
                name: item.service_id,
                type: 'line',
                data: LegendDataNumber
            })
        })
        return { legend: LegendArr, xAxis: LegendxAxis, value: LegendData };
    }
    setDisabledDate = (current) => {
        if (!current) {
            return false;
        } else {
            return current > moment();
        }
    }
    changeDate = (date) => {
        // clear
        if (this.dateObj && !date) {
            this.getChartsData();
        }
        this.dateObj = date;
    }
    selectedDate = status => {
        if (!status) {
            const { dateObj, getChartsData } = this;
            if (dateObj) {
                getChartsData(dateObj.valueOf());
            }
        }
    }

    componentDidUpdate() {
        const tableList = this.props.businessmonitor.get('tableData').toJS().data;
        const trafficList = this.props.businessmonitor.get('traffic').toJS().data;
        const onlineuserList = this.props.businessmonitor.get('onlineusers').toJS().data;
        const bandwidthList = this.props.businessmonitor.get('bandwidth').toJS().data;
        if (tableList.length && !trafficList.length && !onlineuserList.length && !bandwidthList.length) {
            this.getChartsData();
        }
    }

    render() {
        const { t } = this.props;
        // const { showLoading } = this.state;
        const { loading } = this.state;
        const pageSizeOptions = ['6', '8', '10'];

        const trafficData = this.props.businessmonitor.get('traffic').toJS();
        const onlineusersData = this.props.businessmonitor.get('onlineusers').toJS();
        const bandwidthData = this.props.businessmonitor.get('bandwidth').toJS();

        const trafficConfig = this.processPieData(trafficData, "traffic");
        const onlineusersConfig = this.processLineData(onlineusersData, "onlineusers");
        const bandwidthConfig = this.processLineData(bandwidthData, "bandwidth");

        return (
            <div className="businessmonitor">
                <DatePicker showTime disabledDate={this.setDisabledDate} onChange={this.changeDate} onOpenChange={this.selectedDate} />
                <Row type="flex" gutter={16} justify="space-around" className="businessmonitor_imagecontainer">
                    <Col span={6}>
                        <Chartbox chartConfig={pieChartconfig} pieExtraConfig={trafficConfig} chartName={t("Slicing Traffic")} chartStyle={chartStyle} loading={loading} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} lineExtraConfig={onlineusersConfig} chartName={t("Onlines Users")} chartStyle={chartStyle} loading={loading} />
                    </Col>
                    <Col span={9}>
                        <Chartbox chartConfig={chartConfig} lineExtraConfig={bandwidthConfig} chartName={t("Slicing Bandwidth")} chartStyle={chartStyle} loading={loading} />
                    </Col>
                </Row>
                <BusinessMGTTable className="businessmonitor_table" getChartsData={this.getChartsData} pageSizeOptions={pageSizeOptions} />
                <Loading />
            </div>
        );
    }
}
export default withNamespaces()(connect(
    state => ({ businessmonitor: state.businessmonitor }),
    actions
)(BusinessMonitor));