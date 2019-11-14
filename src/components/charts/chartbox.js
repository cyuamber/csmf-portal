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
        const { chartConfig, pieExtraConfig,lineExtraConfig,chartName } = this.props;
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        if (myChart === undefined) {
            myChart = echarts.init(document.getElementById(id));
        }
        myChart.showLoading({
            text: 'loading...',
            x: 'center'
        })
        if(pieExtraConfig && pieExtraConfig.value.length){
            myChart.hideLoading()
        }else if(lineExtraConfig && lineExtraConfig.legend.length) {
            if(chartName === '在线用户数量' || chartName === 'Onlines Users'){
                myChart.hideLoading()
            }else {
                myChart.hideLoading()
            }
        }
        myChart.setOption(chartConfig);
        if (pieExtraConfig) {
            myChart.setOption({
                legend: {
                    data: pieExtraConfig.arr,
                    type: 'scroll'
                },
                series: [
                    {
                        name:pieExtraConfig.legendName,
                        data: pieExtraConfig.value
                    }
                ]
            });
        }
        if(lineExtraConfig){
            myChart.setOption({
                legend: {
                    data: lineExtraConfig.legend,
                    type: 'scroll'
                },
                xAxis:{
                    data:lineExtraConfig.xAxis
                },
                series: lineExtraConfig.value
            });
        }
        window.addEventListener('resize', () =>{
            myChart.resize()
        }) 
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