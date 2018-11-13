import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Table } from 'antd';
import DescriptionList from './components/Description';
import GridContent from './components/GridContent.jsx';
import Path from '@/components/Common/Path';

const { Description } = DescriptionList;


const columns = [{
  title: 'QPS',
  dataIndex: 'qps',
}, {
  title: '平均响应时间',
  dataIndex: 'avg_response_time',
  render: text => `${text}ms`,
}, {
  title: '最小响应时间',
  dataIndex: 'min_response_time',
  render: text => `${text}ms`,
}, {
  title: '最大响应时间',
  dataIndex: 'max_response_time',
  render: text => `${text}ms`,
}, {
  title: '90%的平均响应时间',
  dataIndex: 'pct90',
  render: text => `${text}ms`,
}, {
  title: '错误率%',
  dataIndex: 'avg_error_ratio',
  render: text => `${text}%`,
}];

@observer
class Detail extends Component {
  constructor(props) {
    super(props);
    this.handleCloseWork = this.handleCloseWork.bind(this);
  }

  componentDidMount() {
    const { stores: { chart }, match } = this.props;
    if (match.params.res === '任务执行详情') {
      chart.getTaskDetail({ taskid: +match.params.id }, (id) => {
        this.startLog(id);
      });
    } else {
      chart.getTaskLogDetail({ tasklogid: +match.params.id });
      this.historyResLog(+match.params.id);
    }
  }

  componentWillUnmount() {
    const { chart } = this.props.stores;
    chart.handleReset();
    clearInterval(chart.timer5);
    clearInterval(chart.timer10);
    clearInterval(chart.timer30);
  }

  startLog(id) {
    const { stores: { chart } } = this.props;
    const params = {
      tasklog_id: id,
      mode: 2,
      type: 0,
      // debug: 'on',
    };
    chart.getChartData(params);
    // 机器初始
    chart.getChartRootData({
      task_log_id: id,
      // task_log_id: 15380182811840,
      type: 0,
    });
    // 定时器
    chart.timeWork(params);
  }

  historyResLog(id) {
    const { stores: { chart } } = this.props;
    const params = {
      tasklog_id: id,
      mode: 2,
      type: 0,
      // debug: 'on',
    };
    chart.getResChartData(params);
    // 机器初始
    chart.getChartRootData({
      task_log_id: id,
      // task_log_id: 15380182811840,
      type: 0,
    });
  }

  handleCloseWork() {
    const { stores: { chart }, match } = this.props;
    clearInterval(chart.timer5);
    clearInterval(chart.timer10);
    clearInterval(chart.timer30);
    chart.stopTask(+match.params.id);
  }

  render() {
    const {
      chartData,
      chartLoading,
      detailData,
      resTableData,
      cpuBusyY,
      cpuBusyX,
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
    } = this.props.stores.chart;

    const { match } = this.props;
    const pathArr1 = [{ name: '任务管理', path: '/Task' }, { name: '任务执行详情' }];
    const pathArr2 = [{ name: '任务管理', path: '/Task' },
      { name: '查看任务', path: `/Task/Detail/${match.params.index}` }, { name: '历史结果' }];
    // const pathArr2 = [{ name: '任务管理', path: '/Task' }, { name: '查看任务' }, { name: '历史结果' }];
    const pathUrl = match.params.res === '任务执行详情' ? pathArr1 : pathArr2;
    return (
      <div>
        <Path data={pathUrl} />
        <Card>
          <DescriptionList
            title={match.params.res}
            col={3}
            hasBtn={match.params.res === '任务执行详情'}
            handleCloseWork={this.handleCloseWork}
            style={{ marginBottom: 32 }}>
            <Description term="任务名称">{detailData.taskname}</Description>
            <Description term="关联用例">{detailData.casename}</Description>
            <Description term="任务描述">{detailData.taskdesc}</Description>
            <Description term="并发数">{detailData.threadnum}</Description>
            <Description term="初始化并发数">
              {detailData.initthreadnum}
              <span style={{ marginLeft: 60 }}>{`每${detailData.intervaltime || 'x'}秒增加${detailData.addthreadnum || 'x'}并发`}</span>
            </Description>
            <Description term="测试时长(秒)">{detailData.runtime}</Description>
            <Description term="监控负载机">{detailData.loadmachine}</Description>
            <Description term="监控Mysql">{detailData.mysqlmachine}</Description>
            <Description term="监控Redis">{detailData.redismachine}</Description>
          </DescriptionList>
          {match.params.res !== '任务执行详情' && (
            <Table
              rowKey={(row, i) => i}
              dataSource={resTableData}
              columns={columns}
              bordered
              pagination={false}
              style={{ marginBottom: 20 }}
            />)}
          <GridContent
            chartData={chartData}
            loading={chartLoading}
            cpuBusyX={cpuBusyX}
            cpuBusyY={cpuBusyY}
            cpuUserX={cpuUserX}
            cpuUserY={cpuUserY}
            memUsedX={memUsedX}
            memUsedY={memUsedY}
            memUsedPerX={memUsedPerX}
            memUsedPerY={memUsedPerY}
            netInX={netInX}
            netInY={netInY}
            netOutX={netOutX}
            netOutY={netOutY}
            questionX={questionX}
            questionY={questionY}
            redisX={redisX}
            redisY={redisY}
          />
        </Card>
      </div>
    );
  }
}

export default Detail;
