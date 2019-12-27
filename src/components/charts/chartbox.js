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
        const { chartConfig, pieExtraConfig, lineExtraConfig, chartName, loading } = this.props;
        if(!loading) return 
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById(id));
        }
        myChart.showLoading({
            text: 'loading...',
            x: 'center'
        })
        if ((pieExtraConfig && pieExtraConfig.value.length) || !loading) {
            myChart.hideLoading()
        } else if ((lineExtraConfig && lineExtraConfig.legend.length) || !loading) {
            if (chartName === '在线用户数量' || chartName === 'Onlines Users') {
                myChart.hideLoading()
            } else {
                myChart.hideLoading()
            }
        }
        myChart.setOption(chartConfig, true);
        if (pieExtraConfig) {
            myChart.setOption({
                legend: {
                    data: pieExtraConfig.arr,
                    type: 'scroll'
                },
                series: [
                    {
                        name: pieExtraConfig.legendName,
                        data: pieExtraConfig.value
                    }
                ]
            });
        }
        if (lineExtraConfig) {
            myChart.setOption({
                legend: {
                    data: lineExtraConfig.legend,
                    type: 'scroll'
                },
                xAxis: {
                    data: lineExtraConfig.xAxis
                },
                series: lineExtraConfig.value
            });
        }
        window.addEventListener('resize', () => {
            myChart.resize()
        })
    }
    render() {
        const { chartStyle, chartName, loading } = this.props;

        return (
            <div className="chartArea">
                <p className="chartArea_title">{chartName}</p>
                {
                    loading ? <div id={this.state.lineId} style={chartStyle}></div> : <p className="noData">NO DATA</p>
                }
            </div>
        )
    }
}

export default Chartbox;