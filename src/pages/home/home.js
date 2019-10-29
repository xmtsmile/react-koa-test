import React from 'react'
import ReactEcharts from 'echarts-for-react';
import api from "../../api";

class home extends React.Component {
    constructor(props) {
        // es6继承必须用super调用父类的constructor
        super(props);
        this.state = {}
    };

    componentDidMount() {
        this.getChartsData()
    };

    getChartsData = () => {
        api.post('/article/listAll', {}).then(res => {
            console.log('listlist---', res)
        });
    };

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        return option;
    };

    render() {
        return (
            <div>
                <ReactEcharts option={this.getOption()} style={{height: '400px'}}/>
            </div>
        );
    }
}

export default home;
