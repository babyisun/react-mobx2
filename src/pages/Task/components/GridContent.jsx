import React, { Component } from 'react';
import moment from 'moment';
import {
  Row,
  Col,
} from 'antd';
import ReactEcharts from '@/components/Common/ReactEcharts';
import ChartCard from './ChartCard';
import styles from './GridContent.scss';

const ColResponsiveProps4 = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};
const ColResponsiveProps2 = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  style: { marginBottom: 24 },
};

const ColResponsiveProps1 = {
  xl: 24,
  style: { marginBottom: 24 },
};

const handleSetOption = (x, y, title, unit) => ({
  title: {
    text: title,
  },
  legend: {
    data: y.map(v => v.name),
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: x,
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
    splitLine: { show: false }, // 不显示网格线
  },
  tooltip: {
    trigger: 'axis',
    formatter: (p) => {
      if (p && p.length > 0) {
        let str = p[0].name;
        for (let i = 0; i < p.length; i++) {
          str += `<br/>${p[i].marker}${p[i].seriesName}: ${p[i].value}${unit || ''}`;
        }
        return str;
      }
      return null;
    },
  },
  series: y,
});

const handleSetOption2 = (x, y, title, unit) => ({
  // color: [
  //   '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  //   '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  //   '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  //   '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089',
  // ],
  title: {
    text: title,
  },
  xAxis: {
    show: true,
    type: 'category',
    boundaryGap: false,
    data: x,
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
  },
  grid: {
    // left: '5%',
    // right: '5%',
    left: '22px',
    right: '22px',
    bottom: '10%',
    containLabel: false,
  },
  yAxis: {
    show: false,
  },
  tooltip: {
    trigger: 'axis',
    formatter: (p) => {
      if (p && p.length > 0) {
        let str = p[0].name;
        for (let i = 0; i < p.length; i++) {
          str += `<br/>${p[i].marker}${p[i].seriesName}: ${p[i].value}${unit || ''}`;
        }
        return str;
      }
      return null;
    },
  },
  series: y,
});


const handleSetOptionQps = (x, y, title, unit) => ({
  color: [
    '#05a6f4', '#fe9576',
  ],
  title: {
    text: title,
  },
  legend: {
    data: y.map(v => v.name),
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: x,
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '10%',
    containLabel: false,
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#000',
      },
    },
    splitLine: { show: false }, // 不显示网格线
  },
  tooltip: {
    trigger: 'axis',
    formatter: (p) => {
      if (p && p.length > 0) {
        let str = p[0].name;
        for (let i = 0; i < p.length; i++) {
          str += `<br/>${p[i].marker}${p[i].seriesName}: ${p[i].value}${(p[i].seriesName !== 'QPS' && unit) || ''}`;
        }
        return str;
      }
      return null;
    },
  },
  series: y,
});
class GridContent extends Component {
  render() {
    const {
      chartData,
      chartLoading,
      cpuBusyX,
      cpuBusyY,
      cpuUserX,
      cpuUserY,
      memUsedX,
      memUsedY,
      memUsedPerX,
      memUsedPerY,
      netInX,
      netInY,
      netOutX,
      netOutY,
      questionX,
      questionY,
      redisX,
      redisY,
    } = this.props;
    const x_hh = chartData.map(v => moment.unix(v.time).format('HH:mm:ss'));
    const y_time = [{
      data: chartData.map(v => v.avg_response_time),
      type: 'line',
      smooth: true,
      showSymbol: false,
      areaStyle: { opacity: 0.2 },
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
        ],
      },
      itemStyle: {
        normal: {
          color: '#3366cc',
          lineStyle: {
            color: '#5574a6',
          },
        },
      },
    }];
    const y_qps = [{
      name: 'QPS',
      data: chartData.map(v => v.qps),
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
        ],
      },
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 5,
      itemStyle: {
        normal: {
          color: '#05a6f4',
          borderColor: 'rgba(5,166,244,0.2)',
          borderWidth: 12,

        },
      },
      lineStyle: {
        width: 4,
      },
    }, {
      name: 'Error Number',
      data: chartData.map(v => v.eps),
      type: 'line',
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 5,
      itemStyle: {
        normal: {
          color: '#fe9576',
          borderColor: 'rgba(254,150,133,0.2)',
          borderWidth: 12,

        },
      },
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
        ],
      },
      // areaStyle: { opacity: 0.2 },
      lineStyle: {
        width: 4,
      },
    }];
    const y_num = [{
      data: chartData.map(v => v.thread_num),
      type: 'line',
      smooth: true,
      showSymbol: false,
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
        ],
      },
      itemStyle: {
        normal: {
          color: '#05a6f4',
        },
      },
    }];

    return (
      <div className={styles.main}>
        <Row gutter={24}>
          <Col {...ColResponsiveProps1}>
            <ChartCard>
              <ReactEcharts option={handleSetOptionQps(x_hh, y_qps, 'QPS/Error_Number', '个')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColResponsiveProps2}>
            <ChartCard loading={chartLoading}>
              <ReactEcharts option={handleSetOption(x_hh, y_time, '响应时间(ms)', 'ms')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
          <Col {...ColResponsiveProps2}>
            <ChartCard>
              <ReactEcharts option={handleSetOption(x_hh, y_num, '并发数', '个')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColResponsiveProps2}>
            <ChartCard>
              <ReactEcharts option={handleSetOption(questionX, questionY, 'MYSQL_QPS')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
          <Col {...ColResponsiveProps2}>
            <ChartCard>
              <ReactEcharts option={handleSetOption(redisX, redisY, 'REDIS_QPS')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColResponsiveProps4}>
            <ChartCard>
              <ReactEcharts option={handleSetOption2(cpuBusyX, cpuBusyY, 'CPU_BUSY', '%')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
          <Col {...ColResponsiveProps4}>
            <ChartCard>
              <ReactEcharts option={handleSetOption2(cpuUserX, cpuUserY, 'CPU_USER', '%')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
          <Col {...ColResponsiveProps4}>
            <ChartCard>
              <ReactEcharts option={handleSetOption2(memUsedX, memUsedY, 'MEM_USED')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
          <Col {...ColResponsiveProps4}>
            <ChartCard>
              <ReactEcharts option={handleSetOption2(memUsedPerX, memUsedPerY, 'MEM_USED_PERCENT', '%')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...ColResponsiveProps2}>
            <ChartCard>
              <ReactEcharts option={handleSetOption2(netInX, netInY, 'NET_BOND1_IN_BITPS(MB)', 'MB')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
          <Col {...ColResponsiveProps2}>
            <ChartCard>
              <ReactEcharts option={handleSetOption2(netOutX, netOutY, 'NET_BOND1_OUT_BITPS(MB)', 'MB')} showLoading={chartLoading} />
            </ChartCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GridContent;
