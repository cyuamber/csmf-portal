import React, { Component } from 'react';
import echarts from 'echarts';
import './style.less';

class Chartbox extends Component {
    constructor(props) {
        super(props);
        let id = ('_' + Math.random()).replace('.', '_');
        this.state = {
            lineId: 'line' + id
        }
    }

    componentDidMount() {
        this.initEchart(this.state.lineId);
    }
    componentDidUpdate() {
        this.initEchart(this.state.lineId);
    }
    initEchart(id) {
        const { chartConfig, pieExtraConfig } = this.props;
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById(id));
        }
        myChart.setOption(chartConfig);
        if (pieExtraConfig) {
            myChart.setOption({
                legend: {
                    data: pieExtraConfig.arr
                },
                series: [
                    {
                        data: pieExtraConfig.value
                    }
                ]
            });
        }
    }
    render() {
        const { chartStyle, chartName } = this.props;

        return (
            <div className="chartArea">
                <p className="chartArea_title">{chartName}</p>
                <div className="chartArea_chart" id={this.state.lineId} style={chartStyle}></div>
            </div>
        )
    }
}

export default Chartbox;