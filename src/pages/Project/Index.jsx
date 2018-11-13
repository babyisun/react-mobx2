import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Card, Table, Input, Icon, Tooltip } from 'antd';
import { Launcher } from '@/components/Common/Launcher';
import ListHeader from '@/components/Common/ListHeader';
import Filter from '@/components/Common/Filter';
import AddProjectModal from './components/AddProjectModal';
import EditProjectModal from './components/EditProjectModal';
// import { twoAClass } from './Index.scss';

@observer
class Project extends Component {
  componentDidMount() {
    // 加载数据
    this.props.stores.project.load();
  }

  // 查询项
  fields = () => [
    {
      label: '项目名称',
      value: 'appname',
      el: <Input placeholder="请输入项目名称" />,
    },
  ];

  columns = () => [{
    title: '序号',
    dataIndex: 'id',
  }, {
    title: '项目名称',
    dataIndex: 'appname',
  }, {
    title: '项目描述',
    dataIndex: 'appdesc',
  }, {
    title: '操作',
    width: '10%',
    render: (text, row) => (
      <div>
        {/* <Tooltip title="查看">
          <Icon type="eye" />
        </Tooltip> */}
        <Tooltip title="编辑">
          <Icon type="edit" onClick={() => this.props.stores.project.onEdit(row)} />
        </Tooltip>
        {/* <Popconfirm title="确定要删除吗？" onConfirm={() => {}}>
          <Icon type="delete" />
        </Popconfirm> */}
      </div>
    ),
  }];

  render() {
    const { project: {
      onSearch,
      params,
      data,
      loadLoading,
      rowData,
      total,
      pagination,
      onPageChange,
      addVisible,
      editVisible,
      setAddModalVisible,
      setEditModalVisible,
      onSubmitCreate,
      onSubmitEdit } } = this.props.stores;
    return (
      <Card>
        <ListHeader title="项目管理" btnName="新增项目" onCreate={() => { setAddModalVisible(true); }} />
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
        <AddProjectModal
          addVisible={addVisible}
          setAddModalVisible={setAddModalVisible}
          onSubmitCreate={onSubmitCreate}
        />
        <EditProjectModal
          rowData={rowData}
          editVisible={editVisible}
          setEditModalVisible={setEditModalVisible}
          onSubmitEdit={onSubmitEdit}
        />
      </Card>
    );
  }
}

export default Project;
