import React, { Component } from 'react';
import echarts from 'echarts';

class StackLine extends Component {
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
    initEchart(id) {
        const { chartConfig } = this.props;
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById(id));
        }
        let option = chartConfig;
        myChart.setOption(option);
    }
    render() {
        const { lineStyle } = this.props;

        return (
            <div id={this.state.lineId} style={lineStyle}></div>
        )
    }
}

export default StackLine;