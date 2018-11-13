import React from 'react';
import { observer } from 'mobx-react';
import ReactEcharts from '@/components/Common/ReactEcharts';
import formatSeconds from '../utils/formatTime';

@observer class ThReadChart extends React.Component {
  constructor() {
    super();
    this.state = {
      option: {},
    };
  }

  componentWillReceiveProps(newProp) {
    const { threadnum, addthreadnum, initthreadnum, runtime, intervaltime } = newProp;
    this.getOption(parseInt(threadnum, 10),
      parseInt(addthreadnum, 10),
      parseInt(initthreadnum, 10),
      parseInt(runtime, 10),
      parseInt(intervaltime, 10));
  }

  getOption = (threadnum, addthreadnum, initthreadnum, runtime, intervaltime) => {
    const arrX = [];
    const arrY = [];
    const addTime = addthreadnum && intervaltime ? (threadnum / addthreadnum) * intervaltime : 0;
    const totalThreadnum = addthreadnum && intervaltime ? threadnum + initthreadnum : initthreadnum;
    const totalTime = runtime + addTime;
    let Y = 0;
    if (runtime) {
      // 并发数增长阶段
      if (addTime) {
        for (let i = 0; i <= addTime; i++) {
          Y = initthreadnum + parseInt(i / intervaltime, 10) * addthreadnum;
          arrY.push(Y);
          arrX.push(formatSeconds(i));
          if (Y === totalThreadnum) {
            break;
          }
        }
      }
      // 并发数停止增加到达顶端
      for (let i = (addTime + 1); i <= totalTime; i++) {
        arrX.push(formatSeconds(i));
        arrY.push(totalThreadnum);
      }
      // 并发数归零点
      arrX.push(formatSeconds(totalTime + 1));
      arrY.push(0);
    }

    this.setState({
      option: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: arrX,
        },
        tooltip: {
          trigger: 'axis',
        },
        yAxis: {
          name: '并发数',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            type: 'line',
            name: '并发',
            data: arrY,
          },
        ],
      },
    });
  }

  render() {
    return (
      <div>
        <ReactEcharts option={this.state.option} />
      </div>
    );
  }
}

export default ThReadChart;
