import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Row, Tooltip, Table, Icon, Skeleton } from 'antd';
import { Launcher } from '@/components/Common/Launcher';
import Path from '@/components/Common/Path';
import ListHeader from '@/components/Common/ListHeader';
import DetailList from '@/components/Common/DetailList';
import moment from 'moment';

@observer
class DetailTask extends Component {
  componentDidMount() {
    // 加载数据
    this.props.stores.task.loadDetail(this.props.match.params.id);
    this.props.stores.task.loadDetailList(this.props.match.params.id);
  }

  // 表单项
  caseInfo = () => [
    {
      label: '任务名称',
      el: <span>{this.props.stores.task.rowData.taskname}</span>,
    },
    {
      label: '任务描述',
      el: <span>{this.props.stores.task.rowData.taskdesc}</span>,
    },
    {
      label: '所属项目',
      el: <span>{this.props.stores.task.rowData.appname}</span>,
    },
    {
      label: '关联用例',
      el: <span>{this.props.stores.task.rowData.casename}</span>,
    },
    {
      label: '并发数',
      el: <span>{this.props.stores.task.rowData.threadnum}</span>,
    },
    {
      el:
  <span>
    每&nbsp;
    {this.props.stores.task.rowData.intervaltime}
&nbsp;
    秒&nbsp;增加&nbsp;
    {this.props.stores.task.rowData.addthreadnum}
&nbsp;
    并发
  </span>,
    },
    {
      label: '初始化并发数',
      el: <span>{this.props.stores.task.rowData.initthreadnum}</span>,
    },
    {
      label: '执行时长（秒）',
      value: 'assertcontent',
      el: <span>{this.props.stores.task.rowData.runtime}</span>,
    },
  ];

  columns = () => [{
    title: '任务日志ID',
    dataIndex: 'tasklogid',
  }, {
    title: '任务名称',
    dataIndex: 'taskname',
  }, {
    title: '并发数',
    dataIndex: 'threadnum',
  }, {
    title: '测试时长（秒）',
    dataIndex: 'runtime',
  }, {
    title: '起压机',
    dataIndex: 'machineip',
  }, {
    title: '端口',
    dataIndex: 'machineport',
  }, {
    title: '创建时间',
    dataIndex: 'createtime',
    render: value => moment.unix(value).format('YYYY-MM-DD HH:mm:ss'),
  }, {
    title: '操作人',
    dataIndex: 'operatorname',
  }, {
    title: '操作',
    width: '10%',
    render: (text, row) => (
      <div>
        <Tooltip title="查看历史结果" onClick={() => this.props
          .history.push(`/Task/WatchDetail/${row.tasklogid}/历史结果详情/${this.props.match.params.id}`)}>
          <Icon type="eye" />
        </Tooltip>
      </div>
    ),
  }];

  render() {
    const { task: {
      loadLoading,
      detailLoading,
      dataDetail } } = this.props.stores;
    return (
      <div>
        <Path data={[{ name: '任务管理', path: '/Task' }, { name: '查看任务' }]} />
        <Card>
          <ListHeader title="查看任务" />
          <Row gutter={24} type="flex" justify="space-between" className="page-header">
            <Card title="1.任务详情" style={{ width: '100%' }}>
              <Skeleton loading={detailLoading} active>
                <DetailList
                  fromData={this.caseInfo()}
            />
              </Skeleton>
            </Card>
          </Row>
          <Row gutter={24} type="flex" justify="space-between" className="page-header">
            <Card title="2.历史任务" style={{ width: '100%' }}>
              <Skeleton loading={detailLoading} active>
                <Table
                  bordered
                  columns={this.columns()}
                  dataSource={dataDetail}
                  loading={{ spinning: loadLoading, indicator: <Launcher small /> }}
                  rowKey={row => row.id}
                  pagination={false}
             />
              </Skeleton>
            </Card>
          </Row>
        </Card>
      </div>
    );
  }
}

export default DetailTask;
