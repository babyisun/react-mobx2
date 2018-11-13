import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Table, Input, Icon, Tooltip, Select } from 'antd';
import { Launcher } from '@/components/Common/Launcher';
import ListHeader from '@/components/Common/ListHeader';
import Filter from '@/components/Common/Filter';
import moment from 'moment';
import StartTaskModal from './components/startTaskModal';

const { Option } = Select;

@observer
class Task extends Component {
  componentDidMount() {
    // 加载数据
    this.props.stores.task.load();
    this.props.stores.task.loadAppList();
    this.props.stores.task.loadMachine();
  }

  onDetail(row) {
    this.props.stores.task.setRowData(row);
    this.props.history.push(`/Task/Detail/${row.id}`);
  }

  onEdit(row) {
    this.props.stores.task.setRowData(row);
    this.props.history.push(`/Task/Edit/${row.id}`);
  }

  onCheck(row) {
    this.props.history.push(`/Task/WatchDetail/${row.id}/任务执行详情/1`);
  }

  onStart() {
    this.setRowData();
  }

  // 查询项
  fields = () => [
    {
      label: '任务ID',
      value: 'taskid',
      el: <Input placeholder="请输入任务ID" />,
    },
    {
      label: '任务名称',
      value: 'taskname',
      el: <Input placeholder="请输入任务名称" />,
    },
    {
      label: '所属项目',
      value: 'appid',
      el:
  <Select placeholder="请选择所属项目" allowClear>
    {this.props.stores.task.appList
      .map(val => <Option value={val.appid} key={val.appid}>{val.appname}</Option>)}
  </Select>,
    },
  ];

  columns = () => [{
    title: '任务ID',
    dataIndex: 'id',
  }, {
    title: '任务名称',
    dataIndex: 'taskname',
  }, {
    title: '关联用例',
    dataIndex: 'casename',
  }, {
    title: '并发数',
    dataIndex: 'threadnum',
  }, {
    title: '测试时长（秒）',
    dataIndex: 'runtime',
  }, {
    title: '所属项目',
    dataIndex: 'appname',
  }, {
    title: '创建时间',
    dataIndex: 'createtime',
    render: value => moment.unix(value).format('YYYY-MM-DD HH:mm:ss'),
  }, {
    title: '操作',
    width: '10%',
    render: (text, row) => (
      <div>
        { !row.taskstatus
          ? (
            <Tooltip
              title="开始任务"
              onClick={() => this.props.stores.task.setStartModalVisible(true, row)}>
              <Icon type="play-circle" theme="outlined" />
            </Tooltip>
          )
          : (
            <Tooltip title="停止任务" onClick={() => this.props.stores.task.onStopTask(row.id)}>
              <Icon type="pause-circle" theme="outlined" />
            </Tooltip>
          )}
        <Tooltip title="查看任务详情及执行历史" onClick={() => this.onDetail(row)}>
          <Icon type="eye" />
        </Tooltip>
        <Tooltip title="编辑">
          <Icon type="edit" onClick={() => this.onEdit(row)} />
        </Tooltip>
        {row.taskstatus ? (
          <Tooltip title="实时监控">
            <Icon type="line-chart" theme="outlined" onClick={() => this.onCheck(row)} />
          </Tooltip>
        ) : null}
      </div>
    ),
  }];

  render() {
    const { task: {
      onSearch,
      params,
      data,
      loadLoading,
      rowData,
      total,
      pagination,
      onPageChange,
      machineList,
      startVisible,
      setStartModalVisible,
      onStartTask } } = this.props.stores;
    return (
      <Card>
        <ListHeader title="任务管理" btnName="添加任务" onCreate={() => this.props.history.push('/Task/Add')} />
        <Filter
          fields={this.fields()}
          params={params}
          onSearch={onSearch} // 查询
        />
        <Table
          bordered
          columns={this.columns()}
          dataSource={data}
          loading={{ spinning: loadLoading, indicator: <Launcher small /> }}
          rowKey={row => row.id}
          pagination={{
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            onChange: onPageChange,
            onShowSizeChange: onPageChange,
            current: pagination.page,
            pageSize: pagination.perpage,
            total,
          }}
        />
        <StartTaskModal
          rowData={rowData}
          visible={startVisible}
          machineList={machineList}
          setStartModalVisible={setStartModalVisible}
          onStartTask={onStartTask}
          toTaskDetail={() => this.props.history.push(`/Task/WatchDetail/${rowData.id}/任务执行详情/1`)}
        />
      </Card>
    );
  }
}

export default Task;
