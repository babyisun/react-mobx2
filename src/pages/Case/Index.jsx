import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Table, Input, Icon, Tooltip, Select } from 'antd';
import { Launcher } from '@/components/Common/Launcher';
import ListHeader from '@/components/Common/ListHeader';
import Filter from '@/components/Common/Filter';
// import { twoAClass } from './Index.scss';

const { Option } = Select;

@observer
class Case extends Component {
  componentDidMount() {
    // 加载数据
    this.props.stores.case.load();
    this.props.stores.case.loadAppList();
  }

  // 查询项
  fields = () => [
    {
      label: '用例名称',
      value: 'casename',
      el: <Input placeholder="请输入用例名称" />,
    },
    {
      label: '用例ID',
      value: 'caseid',
      el: <Input placeholder="请输入用例ID" />,
    },
    {
      label: '所属项目',
      value: 'appid',
      el:
  <Select placeholder="请选择所属项目">
    {this.props.stores.case.appList
      .map(val => <Option value={val.appid} key={val.appid}>{val.appname}</Option>)}
  </Select>,
    },
  ];


  columns = () => [{
    title: '用例ID',
    dataIndex: 'id',
  }, {
    title: '用例名称',
    dataIndex: 'casename',
  }, {
    title: '服务器IP或名称',
    dataIndex: 'host',
  }, {
    title: '端口号',
    dataIndex: 'port',
  }, {
    title: '请求路径',
    dataIndex: 'path',
  }, {
    title: '请求方法',
    dataIndex: 'method',
  }, {
    title: '响应断言',
    dataIndex: 'assertcontent',
  }, {
    title: '操作',
    width: '10%',
    render: (text, row) => (
      <div>
        <Tooltip title="查看" onClick={() => this.props.history.push(`/Case/Detail/${row.id}`)}>
          <Icon type="eye" />
        </Tooltip>
        <Tooltip title="编辑">
          <Icon type="edit" onClick={() => this.onEdit(row)} />
        </Tooltip>
        {/* <Popconfirm title="确定要删除吗？" onConfirm={() => {}}>
          <Icon type="delete" />
        </Popconfirm> */}
      </div>
    ),
  }];

  onEdit = (row) => {
    this.props.stores.case.loadDetail(row.id).then(() => this.props.history.push(`/Case/Edit/${row.id}`));
  }

  render() {
    const { case: {
      onSearch,
      params,
      data,
      loadLoading,
      total,
      pagination,
      onPageChange } } = this.props.stores;
    return (
      <Card>
        <ListHeader title="用例管理" btnName="新增用例" onCreate={() => this.props.history.push('/Case/Add')} />
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
          rowKey={(row, i) => i}
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
      </Card>
    );
  }
}

export default Case;
